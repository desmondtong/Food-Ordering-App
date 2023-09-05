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

const getCartById = async (req: Request, res: Response) => {
  try {
    const cart = await pool.query(
      "SELECT * FROM carts JOIN carts_items ON uuid = cart_id WHERE user_id = $1",
      [req.params.user_id]
    );

    res.status(201).json(cart);
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Get cart failed" });
  }
};

const addItemToCart = async (req: Request, res: Response) => {
  try {
    const {
      cart_id,
      item_price,
      quantity_ordered,
      user_note,
    }: {
      cart_id: String;
      item_price: Number;
      quantity_ordered: Number;
      user_note: String;
    } = req.body;
    const addedItem = await pool.query(
      "INSERT INTO carts_items (item_id, cart_id, item_price, quantity_ordered, user_note) VALUES ($1 ,$2, $3, $4, $5) RETURNING *",
      [req.params.item_id, cart_id, item_price, quantity_ordered, user_note]
    );

    res.status(201).json({ msg: "Item added to cart", createdItem: addedItem.rows });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Add item to cart failed" });
  }
};

const updateCart = async (req: Request, res: Response) => {
  try {
    // insert item to cart
    const add = await pool.query("INSERT INTO carts");
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Update cart failed" });
  }
};

export { createCart, getCartById, addItemToCart };
