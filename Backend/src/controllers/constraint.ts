import { Request, Response } from "express";
import pool from "../db/db";

const getOpeningDays = async (req: Request, res: Response) => {
  try {
    const getAll = await pool.query("SELECT * FROM opening_days");

    const days = getAll.rows.reduce((acc, item) => {
      acc.push(item.opening_day);
      return acc;
    }, []);

    res.status(201).json(days);
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Get opening days failed" });
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const getAll = await pool.query("SELECT * FROM categories");

    const categories = getAll.rows.reduce((acc, item) => {
      acc.push(item.category);
      return acc;
    }, []);

    res.status(201).json(categories);
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Get categories failed" });
  }
};

const getStatuses = async (req: Request, res: Response) => {
  try {
    const getAll = await pool.query("SELECT * FROM statuses");

    const statuses = getAll.rows.reduce((acc, item) => {
      acc.push(item.status);
      return acc;
    }, []);

    res.status(201).json(statuses);
  } catch (error: any) {
    console.log(error.message);
    res.json({ status: "error", msg: "Get statuses failed" });
  }
};

export { getOpeningDays, getCategories, getStatuses };
