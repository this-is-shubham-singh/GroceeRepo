import express from "express";
import {
  addProduct,
  getAllProducts,
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

export default productRouter;
