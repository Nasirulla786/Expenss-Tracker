import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }
    const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verifyToken) {
      return res.status(500).json({ message: "token not verify" });
    }

    const findUser = await User.findById(verifyToken.id);

    req.userID = findUser._id;

    next();
  } catch (error) {
    console.log("isAuth error", error);
  }
};

export default isAuth;
