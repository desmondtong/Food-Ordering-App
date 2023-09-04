import { Request, Response } from "express";
import pool from "../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// To get all RegisteredData
export const getAllAccount = async (req: Request, res: Response) => {
  try {
    const allAcc = await pool.query("SELECT * FROM users");

    res.json(allAcc.rows);
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

export const getAccountById = async (req: Request, res: Response) => {
  try {
    // to get role of the id
    const role = await pool.query("SELECT role FROM users WHERE uuid = $1", [
      req.params.id,
    ]);

    // different query based on role to join different tables
    let userAcc;
    if (role.rows[0].role === "CUSTOMER") {
      userAcc = await pool.query(
        "SELECT * FROM users JOIN user_details ON uuid = user_id WHERE uuid = $1",
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

export const register = async (req: Request, res: Response) => {
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
    } = req.body;

    // check if email used is already in db
    const auth = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
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

    res.status(201).json({ msg: "User created", createdUser: addAuth });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // check if account exist
    const auth = await pool.query("SELECT * FROM users WHERE email = $1", [
      req.body.email,
    ]);

    if (!auth.rowCount) {
      return res.status(400).json({
        status: "error",
        msg: "You do not have an account. Please register",
      });
    }

    // decrypt and compare password
    const result = await bcrypt.compare(
      req.body.password,
      auth.rows[0].password
    );

    if (!result) {
      console.log("email or password error");
      return res.status(401).json({ status: "error", msg: "Login failed" });
    }

    // create claims
    const claims = {
      email: auth.rows[0].email,
      id: auth.rows[0].uuid,
      role: auth.rows[0].role,
    };

    const access = jwt.sign(claims, String(process.env.ACCESS_SECRET), {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(claims, String(process.env.REFRESH_SECRET), {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "Login failed" });
  }
};

export const refresh = (req: Request, res: Response) => {
  try {
    // declar type for email and id as TS dont know about it
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
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "Token refresh error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    if ("contact" in req.body) {
      await pool.query(
        "UPDATE users SET contact = $1 WHERE uuid = $2 RETURNING contact",
        [req.body.contact, req.params.id]
      );
    }
    // for vendor only
    if ("address" in req.body) {
      await pool.query("UPDATE addresses SET address = $1 WHERE id = $2", [
        req.body.address,
        req.params.id,
      ]);
    }
    if ("postal_code" in req.body) {
      await pool.query("UPDATE addresses SET postal_code = $1 WHERE id = $2", [
        req.body.postal_code,
        req.params.id,
      ]);
    }
    // customer-specfic details
    if ("first_name" in req.body) {
      await pool.query(
        "UPDATE user_details SET first_name = $1 WHERE user_id = $2",
        [req.body.first_name, req.params.id]
      );
    }
    if ("last_name" in req.body) {
      await pool.query(
        "UPDATE user_details SET last_name = $1 WHERE user_id = $2",
        [req.body.last_name, req.params.id]
      );
    }
    // vendor-specific details
    if ("category" in req.body) {
      await pool.query(
        "UPDATE vendor_details SET category = $1 WHERE vendor_id = $2",
        [req.body.category, req.params.id]
      );
    }
    if ("store_name" in req.body) {
      await pool.query(
        "UPDATE vendor_details SET store_name = $1 WHERE vendor_id = $2",
        [req.body.store_name, req.params.id]
      );
    }
    if ("description" in req.body) {
      await pool.query(
        "UPDATE vendor_details SET description = $1 WHERE vendor_id = $2",
        [req.body.description, req.params.id]
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

// export const updateUserAddress (multiple address)

// module.exports = {
//   //   getAccountById,
//   //   getAllAccount,
//   //   updateProfile,
// };
