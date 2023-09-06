import { Request, Response } from "express";
import pool from "../db/db";

const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      vendor_id,
      total_price,
    }: { vendor_id: String; total_price: Number } = req.body;
    const order = await pool.query(
      "INSERT INTO orders (user_id, vendor_id, total_price) VALUES ($1, $2, $3) RETURNING uuid",
      [req.params.user_id, vendor_id, total_price]
    );

    res.status(201).json({ msg: "Order created", order_id: order.rows[0].uuid });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Create order failed" });
  }
};

export { createOrder };
