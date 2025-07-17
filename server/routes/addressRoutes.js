import express from "express";
import { addAddress, getAllAddress } from "../controllers/addressController.js";
import { userAuthentication } from "../middlewares/userAuth.js";
const addressRouter = express.Router();

addressRouter.post("/addAddress", userAuthentication, addAddress);
addressRouter.get("/getAllAddress", userAuthentication, getAllAddress);

export default addressRouter;
