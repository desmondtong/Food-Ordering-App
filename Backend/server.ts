import dotenv from "dotenv";

import express, { Express } from "express";
import http from "http";
import { Server } from "socket.io";

import cors from "cors"; //enables anyone to use the api
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";

dotenv.config();

import auth from "./src/routers/auth";
import items from "./src/routers/items";
import carts from "./src/routers/carts";
import orders from "./src/routers/orders";
import constraint from "./src/routers/constraint";
import image from "./src/routers/image";

//allows api to be called 100 times within 15min interval
const limit = rateLimit({
  windowMs: 1 * 60 * 1000, //1min
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

const app: Express = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
// io.on("connection", () => {
//   console.log("user connected");
// });

app.use(cors());
app.use(helmet());
app.use(limit);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/auth", auth);
app.use("/api", items);
app.use("/api", carts);
app.use("/api", orders);
app.use("/api", constraint);
app.use("/api", image);

const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`server has started on port ${PORT}`);
// });
server.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
