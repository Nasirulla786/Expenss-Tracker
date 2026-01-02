import express from "express";
import isAuth from "../middleware/isAuth.js";
import { AddExpense } from "../controllers/expense.controller.js";

const expenseRouter = express.Router();

expenseRouter.post("/addexpense" , isAuth , AddExpense )


export default expenseRouter;
