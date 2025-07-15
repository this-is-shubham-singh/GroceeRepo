import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const sellerAuthentication = (req, res, next) => {
  try {
    const token = req.cookies.sellerToken;
    if (!token) {
      return res.json({
        success: false,
        message: "seller Unauthorized, Login...",
      });
    }

    const payload = jwt.verify(token, process.env.SECRET_KEY);
    if (!payload) {
      return res.json({
        success: false,
        message: "seller authorization failed, Login...",
      });
    }

    next();
  } catch (e) {
    return res.json({
      success: false,
      message: e.message,
    });
  }
};

export default sellerAuthentication;
