import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userAuthentication = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res.json({
        success: false,
        message: "Unauthorized, Please Login...",
      });
    }

    const payload = jwt.verify(token, process.env.SECRET_KEY); // no need to use await here

    req.user = payload; // better to attach to user, not body

    next();
  } catch (e) {
    return res.json({
      success: false,
      message: e.message,
    });
  }
};

export { userAuthentication };
