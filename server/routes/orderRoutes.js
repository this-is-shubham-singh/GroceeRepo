import express from "express";
import { getAllOrders, getAllUsersOrder, placeOrderCod } from "../controllers/orderController.js";
import { userAuthentication } from "../middlewares/userAuth.js";
import sellerAuthentication from "../middlewares/sellerAuth.js";
const orderRouter = express();

orderRouter.post("/placeOrderCod", userAuthentication, placeOrderCod);
orderRouter.get("/getAllOrders", userAuthentication, getAllOrders);
orderRouter.get("/getAllUsersOrder", sellerAuthentication, getAllUsersOrder)

export default orderRouter;
