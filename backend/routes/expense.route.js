import express from "express";
import isAuth from "../middleware/isAuth.js";
import { AddExpense, getAllExpense } from "../controllers/expense.controller.js";

const expenseRouter = express.Router();

expenseRouter.post("/addexpense" , isAuth , AddExpense )
expenseRouter.get("/getexpense" , isAuth , getAllExpense )


export default expenseRouter;
