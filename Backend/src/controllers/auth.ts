import { Request, Response } from "express";
import pool from "../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// // To seed Data
// const seedAuth = async (req, res) => {
//   try {
//     await AuthModel.deleteMany();

//     await AuthModel.create([
//       {
//         _id: "64e2c2fcdce21246ef81b8ed",
//         email: "desmond@test.com",
//         hash: "$2b$05$NJohi/xGECGnXCit27WdvOSjGrRyZlU1at0MCCIg/9h8T6R6uEvLW",
//         display_name: "Desmond Tong Tong",
//         biography: "Ayo, look mat 7?",
//         help_count: 0,
//         rating: 0,
//         mobile_number: 12345678,
//         location: [
//           {
//             district: "Queenstown",
//             postal_code: 760758,
//             latitude: 1.42602952702202,
//             longitude: 103.834266086838,
//           },
//         ],
//         image_url: "/avatars/8.png",
//       },
//       {
//         _id: "64e2c2fcdce21246ef81b8ee",
//         email: "hwee@test.com",
//         hash: "$2b$05$NJohi/xGECGnXCit27WdvOSjGrRyZlU1at0MCCIg/9h8T6R6uEvLW",
//         display_name: "Hwee",
//         biography: "A then-laywer. So don't mess with me 💅🏻",
//         help_count: 12,
//         rating: 0,
//         mobile_number: 23904825,
//         location: [
//           {
//             district: "Yishun",
//             postal_code: 760761,
//             latitude: 1.4253984246908402,
//             longitude: 103.83325903597616,
//           },
//         ],
//         image_url: "/avatars/30.png",
//       },
//       {
//         _id: "64e2c2ffdce21246ef81b8f4",
//         email: "vinesh@test.com",
//         hash: "$2b$05$NJohi/xGECGnXCit27WdvOSjGrRyZlU1at0MCCIg/9h8T6R6uEvLW",
//         display_name: "Vinesh J",
//         biography: "Imma cat lover 🐈",
//         help_count: 0,
//         rating: 0,
//         mobile_number: 87654321,
//         location: [
//           {
//             district: "Yishun",
//             postal_code: 760753,
//             latitude: 1.4269870421973032,
//             longitude: 103.83462747028466,
//           },
//         ],
//         image_url: "/avatars/1.png",
//       },
//     ]);

//     res.json({ status: "ok", msg: "seeding successful" });
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ status: "error", msg: "seeding error" });
//   }
// };
// // To get all RegisteredData
// const getAllAccount = async (req, res) => {
//   try {
//     const allAcc = await AuthModel.find();
//     res.json(allAcc);
//   } catch (error) {
//     console.log(error.message);
//     res.json({ status: "error", msg: error.message });
//   }
// };

// const getAccountById = async (req, res) => {
//   try {
//     const userAcc = await AuthModel.findById(req.params.id);
//     res.json(userAcc);
//   } catch (error) {
//     console.log(error.message);
//     res.json({ status: "error", msg: error.message });
//   }
// };
// To Register
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

    if (role === "USER") {
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

// const refresh = (req, res) => {
//   try {
//     const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
//     const claims = {
//       email: decoded.email,
//       id: decoded._id,
//     };
//     const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
//       expiresIn: "30d",
//       jwtid: uuidv4(),
//     });
//     res.json({ access });
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ status: "error", msg: "token refresh error" });
//   }
// };

// const updateProfile = async (req, res) => {
//   try {
//     const authDB = await AuthModel.findById(req.params.id);

//     if ("display_name" in req.body) authDB.display_name = req.body.display_name;
//     if ("mobile_number" in req.body)
//       authDB.mobile_number = req.body.mobile_number;
//     if ("biography" in req.body) authDB.biography = req.body.biography;
//     if ("help_count" in req.body) authDB.help_count = req.body.help_count;
//     if ("rating" in req.body) authDB.rating = req.body.rating;

//     if ("location" in req.body)
//       authDB.location[0].district = req.body.location[0].district;
//     if ("location" in req.body)
//       authDB.location[0].postal_code = req.body.location[0].postal_code;
//     if ("image_url" in req.body) authDB.image_url = req.body.image_url;

//     await authDB.save();

//     res.json({ status: "ok", msg: "Account updated", updatedUser: authDB });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ status: "error", msg: error.message });
//   }
// };

// module.exports = {
//   //   seedAuth,
//   register,
//   //   getAccountById,
//   //   getAllAccount,
//   login,
//   //   refresh,
//   //   updateProfile,
// };
