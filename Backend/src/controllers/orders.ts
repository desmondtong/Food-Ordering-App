import { Request, Response } from "express";
import pool from "../db/db";
import { io } from "../../server";

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
      is_active,
    }: { status: String; rating: Number; review: String; is_active: Boolean } =
      req.body;

    if ("status" in req.body) {
      const updateStatus = await pool.query(
        "UPDATE orders SET status = $1 WHERE uuid = $2 RETURNING user_id",
        [status, req.params.order_id]
      );

      // use socket.io to trigger the frontend receiver to trigger action of fetching new orderInfo
      io.emit("orderStatusUpdate", updateStatus.rows[0].user_id);
    }
    if ("rating" in req.body) {
      try {
        // Begin a transaction
        await pool.query("BEGIN");

        // Update the order's rating and get the vendor_id
        const updateResult = await pool.query(
          "UPDATE orders SET rating = $1 WHERE uuid = $2 RETURNING vendor_id",
          [rating, req.params.order_id]
        );

        const thisVendorId = updateResult.rows[0].vendor_id;

        // Calculate the average rating
        const avgRatingResult = await pool.query(
          "SELECT ROUND(AVG(rating), 2) FROM orders WHERE vendor_id = $1",
          [thisVendorId]
        );

        const avgRating = avgRatingResult.rows[0].round;

        // Update the vendor's details with the calculated average rating
        await pool.query(
          "UPDATE vendor_details SET rating = $1 WHERE vendor_id = $2",
          [avgRating, thisVendorId]
        );

        // Commit the transaction
        await pool.query("COMMIT");
      } catch (error: any) {
        await pool.query("ROLLBACK");

        console.error(error.message);
        res
          .status(500)
          .json({ error: "An error occurred while updating the rating" });
      }
    }

    if ("review" in req.body) {
      await pool.query("UPDATE orders SET review = $1 WHERE uuid = $2", [
        review,
        req.params.order_id,
      ]);
    }
    if ("is_active" in req.body) {
      await pool.query("UPDATE orders SET is_active = $1 WHERE uuid = $2", [
        is_active,
        req.params.order_id,
      ]);
    }

    res.status(201).json({ status: "ok", msg: "Order updated" });
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

    const vendor_id = await pool.query(
      "SELECT vendor_id FROM orders WHERE uuid = $1 ",
      [req.params.order_id]
    );

    io.emit("newOrder", vendor_id.rows[0].vendor_id);

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
        "SELECT orders.user_id, user_details.first_name AS customer_name, orders.vendor_id, order_id, status, rating, total_price, review, date, time, item_id, name, items_orders.item_price, quantity_ordered, user_note, image_url FROM orders JOIN items_orders ON orders.uuid = order_id JOIN items ON item_id = items.uuid JOIN user_details ON orders.user_id = user_details.user_id WHERE orders.uuid = $1",
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

const getLastOrderByUserId = async (req: Request, res: Response) => {
  try {
    const user_id: String = req.body.user_id;

    // using CTE, get active order ID from 1st SELECT; using the order ID obtained, get info from 2nd SELECT
    // return an array of objects of the active order ID
    const getByUserId = await pool.query(
      `WITH ActiveOrder AS (SELECT uuid FROM orders WHERE user_id = $1 AND is_active = $2) 
      SELECT orders.user_id, user_details.first_name AS customer_name, orders.vendor_id, order_id, status, rating, total_price, review, date, time, item_id, name, items_orders.item_price, quantity_ordered, user_note, image_url, is_active
      FROM ActiveOrder 
      JOIN orders ON orders.uuid = ActiveOrder.uuid 
      JOIN items_orders ON orders.uuid = order_id 
      JOIN items ON item_id = items.uuid 
      JOIN user_details ON orders.user_id = user_details.user_id`,
      [user_id, true]
    );

    res.status(201).json([getByUserId.rows]);
  } catch (error: any) {
    console.log(error.message);
    res.json({
      status: "error",
      msg: "Get latest customer active order failed",
    });
  }
};

const getActiveOrdersByVendorId = async (req: Request, res: Response) => {
  try {
    const vendor_id: String = req.body.vendor_id;
    const getByVendorId = await pool.query(
      `WITH ActiveOrder AS (
        SELECT uuid FROM orders WHERE vendor_id = $1 AND NOT (status = $2 OR status = $3)
      )
      SELECT orders.user_id, user_details.first_name AS customer_name, orders.vendor_id, order_id, status, rating, total_price, review, date, time, item_id, name, items_orders.item_price, quantity_ordered, user_note, image_url, is_active
      FROM ActiveOrder 
      JOIN orders ON orders.uuid = ActiveOrder.uuid 
      JOIN items_orders ON orders.uuid = order_id 
      JOIN items ON items_orders.item_id = items.uuid 
      JOIN user_details ON orders.user_id = user_details.user_id 
      ORDER BY order_id`,
      [vendor_id, "COMPLETED", "CANCELLED"]
    );

    // use .reduce to reconstruct to an array of arrays. each array contains objects of same order_id
    const transformedArray = getByVendorId.rows.reduce((acc, order) => {
      const existingOrder = acc.find(
        (group: any) => group[0]?.order_id === order.order_id
      );

      if (existingOrder) {
        existingOrder.push(order);
      } else {
        acc.push([order]);
      }

      return acc;
    }, []);

    res.status(201).json(transformedArray);
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Get vendor active orders failed" });
  }
};

export {
  createOrder,
  updateOrder,
  createItemsOrders,
  getItemsOrdersByOrderId,
  getItemsOrdersByVendorId,
  getItemsOrdersByUserId,
  getLastOrderByUserId,
  getActiveOrdersByVendorId,
};
