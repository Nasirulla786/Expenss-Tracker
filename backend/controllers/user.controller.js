import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import GenerateToken from "../utils/token.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "please fill required fields" });
    }

    const checkEmail = await User.findOne({
      email,
    });

    if (checkEmail) {
      return res.status(401).json({ message: "Email is already Exists..!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const token = await GenerateToken(user?._id);

    res.cookie("token", token);

    return res
      .status(200)
      .json({ message: "Register successfully..!", data: user });
  } catch (error) {
    console.log("register error", error);
  }
};

export const loginUSer = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "please fill required fields" });
    }

    const checkEmail = await User.findOne({
      email,
    });

    if (!checkEmail) {
      return res
        .status(409)
        .json({ message: "Incorrect email and password..!",sucess:false });
    }

    const isMatch = await bcrypt.compare(password, checkEmail.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect email or password" , sucess:false });
    }

    const token = await GenerateToken(checkEmail?._id);

    res.cookie("token", token);

    return res
      .status(200)
      .json({ message: "Login successfully..!", data: checkEmail  , sucess:true});
  } catch (error) {
    console.log("login error", error);
  }
};

export const logoutUser = async (req, res) => {
  try {
    await res.clearCookie("token");
    return res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    console.log("logout error", error);
  }
};

export const GetCurrentUser = async (req, res) => {
  try {
    const userId = req.userID;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("getCurrentUser error", error);
  }
};
