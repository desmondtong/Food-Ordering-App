import { Request, Response } from "express";
import pool from "../db/db";

// item_categories
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
      "SELECT * FROM items JOIN item_categories ON uuid = item_id WHERE vendor_id = $1 AND is_deleted = FALSE",
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

    res.status(201).json({ msg: "Item created", item_id: addedItem.rows[0].uuid });
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

const updateItemById = async (req: Request, res: Response) => {
  try {
    const {
      name,
      item_price,
      image_url,
      description,
      category,
    }: {
      name: String;
      item_price: Number;
      image_url: String;
      description: String;
      category: String;
    } = req.body;
    const updatedItem = await pool.query(
      "UPDATE items SET name = $1, item_price = $2, image_url = $3, description = $4 WHERE uuid = $5 RETURNING *",
      [name, item_price, image_url, description, req.params.item_id]
    );

    const updatedCategory = await pool.query(
      "UPDATE item_categories SET category = $1 WHERE item_id = $2 RETURNING *",
      [category, req.params.item_id]
    );

    res.status(201).json({
      msg: "Item updated",
      updatedItem: updatedItem.rows,
      updatedCategory: updatedCategory.rows,
    });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Update item failed" });
  }
};

const deleteItemById = async (req: Request, res: Response) => {
  try {
    const delItem = await pool.query(
      "UPDATE items SET is_deleted = TRUE WHERE uuid = $1 RETURNING *",
      [req.params.item_id]
    );

    res.json({
      status: "ok",
      msg: "Item deleted",
      deleted: delItem.rows,
    });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Delete item failed" });
  }
};

export {
  addItem,
  addCategory,
  getCategoriesByVendor,
  getAllItemByVendor,
  getItemById,
  updateItemById,
  deleteItemById,
};
