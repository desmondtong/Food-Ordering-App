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
    const cart_id: String = req.body.cart_id;
    const order = await pool.query(
      "INSERT INTO items_orders (item_id, order_id, item_price, quantity_ordered, user_note) SELECT item_id, $1, item_price, quantity_ordered, user_note FROM carts_items WHERE cart_id = $2 AND is_deleted = FALSE RETURNING *",
      [req.params.order_id, cart_id]
    );

    const items_id = order.rows.reduce((acc, item) => {
      acc.push(item.item_id);
      return acc;
    }, []);

    res.status(201).json({
      msg: "Items_orders created",
      items_orders: order.rows,
      items_id,
    });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Create items_orders failed" });
  }
};

const getItemsOrdersByOrderId = async (req: Request, res: Response) => {
  try {
    const order_ids: String[] = req.body;

    let orderInfoArr = [];
    for (const order_id of order_ids) {
      const getByOrderId = await pool.query(
        "SELECT user_id, orders.vendor_id, order_id, status, rating, total_price, review, date, time, item_id, name, items_orders.item_price, quantity_ordered, user_note, image_url FROM orders JOIN items_orders ON orders.uuid = order_id JOIN items ON item_id = items.uuid WHERE orders.uuid = $1",
        [order_id]
      );

      orderInfoArr.push(getByOrderId.rows);
    }

    res.status(201).json(orderInfoArr);
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Get item by order id failed" });
  }
};

const getItemsOrdersByVendorId = async (req: Request, res: Response) => {
  try {
    const vendor_id: String = req.body.vendor_id;
    const getByVendorId = await pool.query(
      "SELECT uuid FROM orders WHERE vendor_id = $1",
      [vendor_id]
    );

    const order_id = getByVendorId.rows.reduce((acc, item) => {
      acc.push(item.uuid);
      return acc;
    }, []);

    res.status(201).json({ order_id });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Get items_orders failed" });
  }
};

const getItemsOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const user_id: String = req.body.user_id;
    const getByUserId = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1",
      [user_id]
    );

    const order_id = getByUserId.rows.reduce((acc, item) => {
      acc.push(item.uuid);
      return acc;
    }, []);

    res.status(201).json({ order_id });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Get items_orders failed" });
  }
};

const getActiveOrderByUserId = async (req: Request, res: Response) => {
  try {
    const user_id: String = req.body.user_id;
    const getByUserId = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1 AND status != $2",
      [user_id, "COMPLETED"]
    );

    res.status(201).json({ active_order: getByUserId.rows });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Get active order failed" });
  }
};

const getActiveOrdersByVendorId = async (req: Request, res: Response) => {
  try {
    const vendor_id: String = req.body.vendor_id;
    const getByVendorId = await pool.query(
      "SELECT uuid FROM orders WHERE vendor_id = $1 AND NOT (status = $2 OR status = $3)",
      [vendor_id, "COMPLETED", "CANCELLED"]
    );

    const order_id = getByVendorId.rows.reduce((acc, item) => {
      acc.push(item.uuid);
      return acc;
    }, []);

    res.status(201).json({ order_id });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Get active orders failed" });
  }
};

export {
  createOrder,
  updateOrder,
  createItemsOrders,
  getItemsOrdersByOrderId,
  getItemsOrdersByVendorId,
  getItemsOrdersByUserId,
  getActiveOrderByUserId,
  getActiveOrdersByVendorId,
};
