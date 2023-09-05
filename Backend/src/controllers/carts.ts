import { Request, Response } from "express";
import pool from "../db/db";

const createCart = async (req: Request, res: Response) => {
  try {
    const cart = await pool.query(
      "INSERT INTO carts (user_id) VALUES ($1) RETURNING *",
      [req.params.user_id]
    );

    res.status(201).json({ msg: "Cart created", createdItem: cart.rows });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Create cart failed" });
  }
};

const addItemToCart = async (req: Request, res: Response) => {
  const add = await pool.query("INSERT INTO carts");
};

export { createCart };
