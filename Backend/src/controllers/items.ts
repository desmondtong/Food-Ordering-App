import { Request, Response } from "express";
import pool from "../db/db";

const getCategoriesByVendor = async (req: Request, res: Response) => {
  try {
    const getAll = await pool.query(
      "SELECT COUNT(items.vendor_id), item_categories.category, COUNT(items.name) FROM items JOIN item_categories ON items.uuid = item_categories.item_id WHERE items.vendor_id = $1 GROUP BY item_categories.category",
      [req.params.id]
    );

    const categories = getAll.rows.reduce((acc, item) => {
      acc.push(item.category);
      return acc;
    }, []);

    res
      .status(201)
      .json({ msg: "Category retrieved", getCategory: categories });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Get category failed" });
  }
};

const addCategory = async (req: Request, res: Response) => {
  try {
    // check category already exist
    const category = await pool.query(
      "SELECT * FROM items JOIN item_categories ON items.uuid = item_categories.item_id WHERE uuid = $1",
      [req.params.id]
    );

    // only insert with does not exist
    let create;
    if (!category.rowCount) {
      create = await pool.query(
        "INSERT INTO item_categories (item_id, category) VALUES ($1, $2)",
        [req.params.id, req.body.category]
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

const addItem = async (req: Request, res: Response) => {
  try {
    const { name, item_price, image_url, description } = req.body;
    const addedItem = await pool.query(
      "INSERT INTO items (vendor_id, name, item_price, image_url, description) VALUES ($1 ,$2, $3, $4, $5) RETURNING uuid",
      [req.params.id, name, item_price, image_url, description]
    );

    res.status(201).json({ msg: "Item created", createdItem: addedItem.rows });
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Add item failed" });
  }
};

export { addItem, addCategory, getCategoriesByVendor };
