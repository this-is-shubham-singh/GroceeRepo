import express from "express";
import {
  addProduct,
  getAllProducts,
  updateStock,
} from "../controllers/productController.js";
import { upload } from "../config/multer.js";
import sellerAuth from "../middlewares/sellerAuth.js";
const productRouter = express.Router();

productRouter.post(
  "/addProduct",
  upload.array(["images"]), // multer middleware
  sellerAuth,
  addProduct
);

productRouter.get("/getAllProducts", getAllProducts);
productRouter.post("/updateStock", sellerAuth, updateStock);

export default productRouter;
