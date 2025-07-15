import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // if all data present
    if (!name || !email || !password) {
      return res.json({ success: false, message: "enter all credentials" });
    }

    // if email is already present
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "user already registered" });
    }

    // hash the password
    const hashedPass = await bcrypt.hash(password, 10);

    // store in db
    const newUser = await User.create({ name, email, password: hashedPass });

    return res.json({ success: true, message: "user registered" });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if both email and password are present
    if (!email || !password) {
      return res.json({ success: false, message: "enter valid credentials" });
    }

    // if user is registered or not
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ success: false, message: "user not registered" });
    }

    // verify password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.json({ success: false, message: "incorrect password" });
    }

    // generate jwt token
    const payload = { id: existingUser._id };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    // creating and sending cookie
    res.cookie("userToken", token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      sameSite: process.env.ENVIRONMENT === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "user logged in" });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

const userLogout = async (req, res) => {
  try {
    res.clearCookie("userToken", {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      sameSite: process.env.ENVIRONMENT === "production" ? "strict" : "lax",
    });

    return res.json({ success: true, message: "user logged out" });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

const isUser = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res
        .status(401)
        .json({ success: false, message: "user unauthorized" });
    }

    const user = await User.findById(id).select("-password");

    return res.json({
      success: true,
      userData: user,
      message: "user authorized",
    });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

export { userLogin, userRegister, userLogout, isUser };
