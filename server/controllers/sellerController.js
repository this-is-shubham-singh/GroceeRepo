import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "fill all details" });
    }

    // verify email and pass
    if (email != process.env.SELLER_ID || password != process.env.SELLER_PASS) {
      return res.json({ success: false, message: "incorrect credentials" });
    }

    // create jwt for seller
    const payload = {
      email,
    };
    const sellerToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    // create cookie for seller
    res.cookie("sellerToken", sellerToken, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT == "production",
      sameSite: process.env.ENVIRONMENT == "development" ? "lax" : "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "seller logged in",
    });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.ENVIRONMENT == "production",
      sameSite: process.env.ENVIRONMENT == "development" ? "lax" : "none",
    });

    return res.json({ success: true, message: "seller logged out " });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

const isSeller = async (req, res) => {
  try {
    return res.json({ success: true, message: "seller authenticated" });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

export { sellerLogin, sellerLogout, isSeller };
