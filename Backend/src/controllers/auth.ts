import { Request, Response } from "express";
import pool from "../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// To get all RegisteredData
const getAllAccount = async (req: Request, res: Response) => {
  try {
    const allAcc = await pool.query("SELECT * FROM users");

    res.json(allAcc.rows);
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

const getAllVendor = async (req: Request, res: Response) => {
  try {
    const allAcc = await pool.query(
      "SELECT * FROM users JOIN addresses ON uuid = id JOIN vendor_details ON uuid = vendor_id"
    );

    res.json(allAcc.rows);
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

const getAccountById = async (req: Request, res: Response) => {
  try {
    // to get role of the id
    const role = await pool.query("SELECT role FROM users WHERE uuid = $1", [
      req.params.id,
    ]);

    // different query based on role to join different tables
    let userAcc;
    if (role.rows[0].role === "CUSTOMER") {
      userAcc = await pool.query(
        "SELECT *, carts.uuid AS cart_id FROM users JOIN user_details ON users.uuid = user_details.user_id JOIN carts ON users.uuid = carts.user_id WHERE users.uuid = $1",
        [req.params.id]
      );
    } else if (role.rows[0].role === "VENDOR") {
      userAcc = await pool.query(
        "SELECT * FROM users JOIN addresses ON uuid = id JOIN vendor_details ON uuid = vendor_id WHERE uuid = $1",
        [req.params.id]
      );
    }

    res.json(userAcc?.rows[0]);
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const {
      role,
      email,
      password,
      contact,
      first_name,
      last_name,
      category,
      store_name,
      address,
      postal_code,
    }: {
      role: String;
      email: String;
      password: Buffer; //String will throw an error at bcrypt.hash
      contact: Number;
      first_name: String;
      last_name: String;
      category: String;
      store_name: String;
      address: String;
      postal_code: Number;
    } = req.body;

    // check if email used is already in db
    const auth = await pool.query(
      "SELECT * FROM users WHERE email = $1 and is_deleted = FALSE",
      [email]
    );
    if (auth.rowCount) {
      return res.status(400).json({ msg: "Duplicate email" });
    }

    // proceed to hash password and register user if email does not exist
    const hash = await bcrypt.hash(password, 5);
    const addAuth = await pool.query(
      "INSERT INTO users (role, email, password, contact) VALUES ($1, $2, $3, $4) RETURNING uuid",
      [role, email, hash, contact]
    );
    // store new user uuid in a variable
    const newAuthId = addAuth.rows[0].uuid;

    if (role === "CUSTOMER") {
      // add remaining user details to different table
      await pool.query(
        "INSERT INTO user_details (user_id, first_name, last_name) VALUES ($1, $2, $3)",
        [newAuthId, first_name, last_name]
      );

      // create new cart for customer
      const cart = await pool.query(
        "INSERT INTO carts (user_id) VALUES ($1) RETURNING *",
        [newAuthId]
      );
    } else if (role === "VENDOR") {
      await pool.query(
        "INSERT INTO vendor_details (vendor_id, category, store_name) VALUES ($1, $2, $3)",
        [newAuthId, category, store_name]
      );
      await pool.query(
        "INSERT INTO addresses (id, address, postal_code) VALUES ($1, $2, $3)",
        [newAuthId, address, postal_code]
      );
    } // reserve for ADMIN role

    res.status(201).json({ msg: "User & cart created", createdUser: addAuth });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Server error" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: String; password: Buffer } = req.body;

    // check if account exist
    const auth = await pool.query(
      `SELECT * FROM users WHERE email = $1 AND is_deleted = FALSE`,
      [email]
    );

    if (!auth.rowCount) {
      return res.status(400).json({
        status: "error",
        msg: "You do not have an account. Please register",
      });
    }

    // decrypt and compare password
    const result = await bcrypt.compare(password, auth.rows[0].password);

    if (!result) {
      console.log("email or password error");
      return res.status(401).json({ status: "error", msg: "Login failed" });
    }

    // create claims
    const claims: {
      email: String;
      id: Number;
      role: String;
      cart_id?: String;
      first_name?: String;
      last_name?: String;
      address?: String;
      postal_code?: String;
      store_name?: String;
      category?: String;
      contact?: Number;
      description?: String;
    } = {
      email: auth.rows[0].email,
      id: auth.rows[0].uuid,
      role: auth.rows[0].role,
      contact: auth.rows[0].contact,
    };

    // to add additional claims based on role
    if (auth.rows[0].role === "CUSTOMER") {
      const customerAddnClaims = await pool.query(
        `SELECT carts.uuid AS cart_id, 
        first_name, last_name
        FROM carts 
        JOIN user_details ON carts.user_id = user_details.user_id
        WHERE carts.user_id = $1
        `,
        [auth.rows[0].uuid]
      );

      claims.cart_id = customerAddnClaims.rows[0].cart_id;
      claims.first_name = customerAddnClaims.rows[0].first_name;
      claims.last_name = customerAddnClaims.rows[0].last_name;
    } else if (auth.rows[0].role === "VENDOR") {
      const vendorAddnClaims = await pool.query(
        `SELECT address, postal_code, 
          store_name, category, description 
          FROM addresses 
          JOIN vendor_details ON vendor_id = id 
          WHERE id = $1
          `,
        [auth.rows[0].uuid]
      );

      claims.address = vendorAddnClaims.rows[0].address;
      claims.postal_code = vendorAddnClaims.rows[0].postal_code;
      claims.store_name = vendorAddnClaims.rows[0].store_name;
      claims.category = vendorAddnClaims.rows[0].category;
      claims.description = vendorAddnClaims.rows[0].description;
    }

    const access = jwt.sign(claims, String(process.env.ACCESS_SECRET), {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(claims, String(process.env.REFRESH_SECRET), {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh, claims });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "Login failed" });
  }
};

const refresh = (req: Request, res: Response) => {
  try {
    // declare type for email and id as TS dont know about it
    interface JwtPayLoad {
      email: String;
      id: String;
    }

    const decoded = jwt.verify(
      req.body.refresh,
      String(process.env.REFRESH_SECRET)
    ) as JwtPayLoad;

    const claims = {
      email: decoded.email,
      id: decoded.id,
    };

    const access = jwt.sign(claims, String(process.env.ACCESS_SECRET), {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "Token refresh error" });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const {
      contact,
      address,
      postal_code,
      first_name,
      last_name,
      category,
      store_name,
      description,
      rating,
      image_url,
    }: {
      contact: Number;
      address: String;
      postal_code: Number;
      first_name: String;
      last_name: String;
      category: String;
      store_name: String;
      description: String;
      rating: Number;
      image_url: String;
    } = req.body;

    if ("contact" in req.body) {
      await pool.query(
        "UPDATE users SET contact = $1 WHERE uuid = $2 RETURNING contact",
        [contact, req.params.id]
      );
    }
    // for vendor only
    if ("address" in req.body) {
      await pool.query("UPDATE addresses SET address = $1 WHERE id = $2", [
        address,
        req.params.id,
      ]);
    }
    if ("postal_code" in req.body) {
      await pool.query("UPDATE addresses SET postal_code = $1 WHERE id = $2", [
        postal_code,
        req.params.id,
      ]);
    }
    // customer-specfic details
    if ("first_name" in req.body) {
      await pool.query(
        "UPDATE user_details SET first_name = $1 WHERE user_id = $2",
        [first_name, req.params.id]
      );
    }
    if ("last_name" in req.body) {
      await pool.query(
        "UPDATE user_details SET last_name = $1 WHERE user_id = $2",
        [last_name, req.params.id]
      );
    }
    // vendor-specific details
    if ("category" in req.body) {
      await pool.query(
        "UPDATE vendor_details SET category = $1 WHERE vendor_id = $2",
        [category, req.params.id]
      );
    }
    if ("store_name" in req.body) {
      await pool.query(
        "UPDATE vendor_details SET store_name = $1 WHERE vendor_id = $2",
        [store_name, req.params.id]
      );
    }
    if ("description" in req.body) {
      await pool.query(
        "UPDATE vendor_details SET description = $1 WHERE vendor_id = $2",
        [description, req.params.id]
      );
    }
    if ("rating" in req.body) {
      await pool.query(
        "UPDATE vendor_details SET rating = $1 WHERE vendor_id = $2",
        [rating, req.params.id]
      );
    }
    if ("image_url" in req.body) {
      await pool.query(
        "UPDATE vendor_details SET image_url = $1 WHERE vendor_id = $2",
        [image_url, req.params.id]
      );
    }

    res.json({
      status: "ok",
      msg: "Account updated",
    });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Update failed" });
  }
};

const deleteAccount = async (req: Request, res: Response) => {
  try {
    const deleted = await pool.query(
      "UPDATE users SET is_deleted = TRUE WHERE uuid = $1 RETURNING *",
      [req.params.id]
    );

    res.json({
      status: "ok",
      msg: "Account deleted",
      deletedAcc: deleted.rows[0],
    });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Delete failed" });
  }
};

const updateVendorOperatings = async (req: Request, res: Response) => {
  try {
    interface OperatingDetails {
      opening_day: String;
      opening_time: Date;
      closing_time: Date;
    }

    const objArr: OperatingDetails[] = req.body;
    // convert to an array of days checked by vendor at frontend
    const selectedDays = objArr.reduce((acc: String[], item) => {
      acc.push(item.opening_day);
      return acc;
    }, []);

    const days = await pool.query(
      "SELECT opening_day FROM vendor_operatings WHERE vendor_id = $1 AND is_deleted = FALSE",
      [req.params.id]
    );
    // convert to an array of existing days within database
    const existingDays: String[] = days.rows.reduce(
      (acc: String[], item: OperatingDetails) => {
        acc.push(item.opening_day);
        return acc;
      },
      []
    );

    // delete days unchecked by vendor from database
    for (const day of existingDays) {
      if (!selectedDays.includes(day)) {
        await pool.query(
          "UPDATE vendor_operatings SET is_deleted = TRUE WHERE vendor_id = $1 AND opening_day = $2",
          [req.params.id, day]
        );
      }
    }

    // insert new opening_day
    for (const obj of objArr) {
      // check opening_day already exist
      const day = await pool.query(
        "SELECT opening_day FROM vendor_operatings WHERE vendor_id = $1 AND opening_day = $2 AND is_deleted = FALSE",
        [req.params.id, obj.opening_day]
      );

      // only insert with does not exist
      if (!day.rowCount) {
        await pool.query(
          "INSERT INTO vendor_operatings (opening_day, vendor_id, opening_time, closing_time) VALUES ($1, $2, $3, $4)",
          [obj.opening_day, req.params.id, obj.opening_time, obj.closing_time]
        );
      }
    }

    // update time by vendor (whole array in)
    let update;
    for (const obj of objArr) {
      update = await pool.query(
        "UPDATE vendor_operatings SET opening_time = $3, closing_time = $4 WHERE vendor_id = $2 AND opening_day = $1",
        [obj.opening_day, req.params.id, obj.opening_time, obj.closing_time]
      );
    }

    res.json({
      status: "ok",
      msg: "Account updated",
    });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Update failed" });
  }
};

// customer favourite
const getAllFavourite = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
    }: {
      user_id: String;
    } = req.body;

    const allFav = await pool.query(
      "SELECT * FROM user_favourite WHERE user_id = $1 AND is_deleted = FALSE",
      [user_id]
    );
    const vendorArr = allFav.rows.reduce((acc: String[], item) => {
      acc.push(item.fav_vendor_id);
      return acc;
    }, []);

    // looping to get
    let allVendorInfo: any = [];
    for (const id of vendorArr) {
      const vendorInfo = await pool.query(
        "SELECT * FROM users JOIN addresses ON uuid = id JOIN vendor_details ON uuid = vendor_id WHERE uuid = $1",
        [id]
      );
      allVendorInfo.push(vendorInfo.rows[0]);
    }

    res.json(allVendorInfo);
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

const addFavourite = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      fav_vendor_id,
    }: {
      user_id: String;
      fav_vendor_id: String;
    } = req.body;

    // check if fav_vendor already exist
    const checkFav = await pool.query(
      "SELECT * FROM user_favourite WHERE user_id = $1 AND fav_vendor_id = $2",
      [user_id, fav_vendor_id]
    );

    // if exist then change is_deleted to FALSE; else add
    if (checkFav.rows.length) {
      await pool.query(
        "UPDATE user_favourite SET is_deleted = FALSE WHERE user_id = $1 AND fav_vendor_id = $2",
        [user_id, fav_vendor_id]
      );
    } else {
      await pool.query(
        "INSERT INTO user_favourite (user_id, fav_vendor_id) VALUES ($1, $2)",
        [user_id, fav_vendor_id]
      );
    }

    res.json({ msg: "added to favourite" });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

const delFavourite = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      fav_vendor_id,
    }: {
      user_id: String;
      fav_vendor_id: String;
    } = req.body;

    await pool.query(
      "UPDATE user_favourite SET is_deleted = TRUE WHERE user_id = $1 AND fav_vendor_id = $2",
      [user_id, fav_vendor_id]
    );

    res.json({ msg: "deleted from favourite" });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

export {
  register,
  login,
  refresh,
  updateProfile,
  getAccountById,
  getAllAccount,
  deleteAccount,
  updateVendorOperatings,
  getAllVendor,
  getAllFavourite,
  addFavourite,
  delFavourite,
};
