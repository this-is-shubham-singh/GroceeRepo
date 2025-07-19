import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routers
import dbConnection from "./config/dbConnect.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoutes.js";
import productRouter from "./routes/productRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

// Set up __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// DB Connection
dbConnection();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"], // frontend during dev
    credentials: true,
  })
);

// Backend API routes
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.use(express.static(path.join(_dirname, "../client/dist")));

app.get("/*splat", (_, res) => {
  res.sendFile(path.join(_dirname, "../client/dist/index.html"));
});

// Start the server
app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
