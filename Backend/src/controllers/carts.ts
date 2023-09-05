import { Request, Response } from "express";
import pool from "../db/db";
import { v4 as uuidv4 } from "uuid";

const addItemToCart = async (req: Request, res: Response) => {
    const add = await pool.query(
        "INSERT INTO carts"
    )
};

export {};
