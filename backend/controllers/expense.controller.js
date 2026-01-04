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


export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully"  , data:expense});
  } catch (error) {
    console.log("delete expense error", error);
    res.status(500).json({ message: "Server error" });
  }
};
