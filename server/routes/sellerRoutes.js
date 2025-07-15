import express from "express";
import {
  isSeller,
  sellerLogin,
  sellerLogout,
} from "../controllers/sellerController.js";
import sellerAuthentication from "../middlewares/sellerAuth.js";
const sellerRouter = express.Router();

sellerRouter.post("/sellerLogin", sellerLogin);
sellerRouter.post("/sellerLogout", sellerLogout);
sellerRouter.get("/sellerAuth", sellerAuthentication, isSeller);

export default sellerRouter;
