import { Request, Response } from "express";
import pool from "../db/db";

// item categories
const getCategoriesByVendor = async (req: Request, res: Response) => {
  try {
    const getAll = await pool.query(
      "SELECT COUNT(items.vendor_id), item_categories.category, COUNT(items.name) FROM items JOIN item_categories ON items.uuid = item_categories.item_id WHERE items.vendor_id = $1 GROUP BY item_categories.category",
      [req.params.vendor_id]
    );

    const categories = getAll.rows.reduce((acc, item) => {
      acc.push(item.category);
      return acc;
    }, []);

    res.status(201).json(categories);
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Get category failed" });
  }
};

const addCategory = async (req: Request, res: Response) => {
  try {
    const { category }: { category: String } = req.body;

    // check category already exist
    const checkCategory = await pool.query(
      "SELECT * FROM items JOIN item_categories ON items.uuid = item_categories.item_id WHERE uuid = $1",
      [req.params.item_id]
    );

    // only insert with does not exist
    let create;
    if (!checkCategory.rowCount) {
      create = await pool.query(
        "INSERT INTO item_categories (item_id, category) VALUES ($1, $2)",
        [req.params.item_id, category]
      );
    } else {
      return res.status(400).json({ msg: "Category already exist!" });
    }

    res.status(201).json({ msg: "Category created", createdCategory: create });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Add category failed" });
  }
};

// items
const getAllItemByVendor = async (req: Request, res: Response) => {
  try {
    const getAllItem = await pool.query(
      "SELECT * FROM items JOIN item_categories ON uuid = item_id WHERE vendor_id = $1",
      [req.params.vendor_id]
    );

    res.status(201).json(getAllItem.rows);
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Get item failed" });
  }
};

const addItem = async (req: Request, res: Response) => {
  try {
    const {
      name,
      item_price,
      image_url,
      description,
    }: {
      name: String;
      item_price: Number;
      image_url: String;
      description: String;
    } = req.body;
    const addedItem = await pool.query(
      "INSERT INTO items (vendor_id, name, item_price, image_url, description) VALUES ($1 ,$2, $3, $4, $5) RETURNING uuid",
      [req.params.vendor_id, name, item_price, image_url, description]
    );

    res.status(201).json({ msg: "Item created", createdItem: addedItem.rows });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Add item failed" });
  }
};

const getItemById = async (req: Request, res: Response) => {
  try {
    const getItem = await pool.query(
      "SELECT * FROM items JOIN item_categories ON uuid = item_id WHERE uuid = $1",
      [req.params.item_id]
    );

    res.status(201).json(getItem.rows);
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Get item failed" });
  }
};

export {
  addItem,
  addCategory,
  getCategoriesByVendor,
  getAllItemByVendor,
  getItemById,
};
