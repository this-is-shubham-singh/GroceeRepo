import express from "express";
import {
  userLogin,
  userRegister,
  userLogout,
  isUser,
} from "../controllers/userController.js";
import { userAuthentication } from "../middlewares/userAuth.js";

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
userRouter.post("/logout", userLogout);
userRouter.get("/userAuth", userAuthentication, isUser);

export default userRouter;
