import Expense from "../models/expense.model.js";

export const AddExpense = async(req , res)=>{
    try {
        const {amount , item , date,note } = req.body;
        const userId = req.userID;
        if(!amount || !item || !date){
            return res.status(400).json({message:"required all fields..!"});
        }

        const expense = await Expense.create({
            amount , item , date , note , user:userId
        })

        return res.status(200).json({message:"Expensee add successfully", data:expense});

    } catch (error) {
        console.log("add expense error", error);

    }
}

export const getAllExpense = async(req , res)=>{
    try {
        const userId = req.userID;
        console.log(userId);
        const fetchALlExpenses = await Expense.find({user:userId});
        console.log(fetchALlExpenses)

        return res.status(200).json(fetchALlExpenses)

    } catch (error) {
        console.log("getAllexpenses error" , error);

    }
}
