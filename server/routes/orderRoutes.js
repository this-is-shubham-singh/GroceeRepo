import express from "express";
import { getAllOrders, placeOrderCod } from "../controllers/orderController.js";
import { userAuthentication } from "../middlewares/userAuth.js";
const orderRouter = express();

orderRouter.post("/placeOrderCod", userAuthentication, placeOrderCod);
orderRouter.get("/getAllOrders", userAuthentication, getAllOrders);

export default orderRouter;
