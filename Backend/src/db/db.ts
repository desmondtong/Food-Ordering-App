import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_USER,
  password: process.env.PASSWORD,
  port: 5432,
});

export default pool;
