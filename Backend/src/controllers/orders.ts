import { Request, Response } from "express";
import pool from "../db/db";

// orders
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

    res
      .status(201)
      .json({ msg: "Order created", order_id: order.rows[0].uuid });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Create order failed" });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const {
      status,
      rating,
      review,
    }: { status: String; rating: Number; review: String } = req.body;
    const order = await pool.query(
      "UPDATE orders SET status = $1, rating =$2, review = $3 WHERE uuid = $4 RETURNING *",
      [status, rating, review, req.params.order_id]
    );

    res.status(201).json({ msg: "Order updated", updatedOrder: order.rows });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Update order failed" });
  }
};

// items_orders
const createItemsOrders = async (req: Request, res: Response) => {
  try {
    // copy item_id, item_price, quantity_ordered and user_note from carts_items; insert order_id
    const order = await pool.query(
      "INSERT INTO items_orders (item_id, order_id, item_price, quantity_ordered, user_note) SELECT item_id, $1, item_price, quantity_ordered, user_note FROM carts_items RETURNING *",
      [req.params.order_id]
    );

    const items_id = order.rows.reduce((acc, item) => {
      acc.push(item.item_id);
      return acc;
    }, []);

    res
      .status(201)
      .json({
        msg: "Items_orders created",
        items_orders: order.rows,
        items_id,
      });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Create items_orders failed" });
  }
};

export { createOrder, updateOrder, createItemsOrders };
