import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.auth.js";
import dbConnect from "./utils/db.js";
import expenseRouter from "./routes/expense.route.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000




app.use(cookieParser());
app.use(express.json());
app.use("/api/user" , userRouter);
app.use("/api/expense" , expenseRouter)



app.listen(port,()=>{
    dbConnect();
    console.log(`server is running in ${port}`)
})
