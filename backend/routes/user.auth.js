import { GetCurrentUser, loginUSer, logoutUser, registerUser } from "../controllers/user.controller.js";
import express from "express"
import isAuth from "../middleware/isAuth.js";

const userRouter = express.Router();

userRouter.post("/register" , registerUser);
userRouter.post("/login" , loginUSer);
userRouter.get("/logout" , logoutUser);

userRouter.get("/currentuser", isAuth , GetCurrentUser)



export default userRouter;
