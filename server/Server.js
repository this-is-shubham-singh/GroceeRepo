import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnect.js";
import userRouter from "./routes/userRoute.js";
dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

// db connection
dbConnection();

// setup middlewares
app.get(express.json());

// mouting routes
app.use("/api/user", userRouter);

// dummy route
app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(port, () => {
  console.log("server started");
});
