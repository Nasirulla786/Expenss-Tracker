import mongoose, { Mongoose } from "mongoose";

const exSchema = new mongoose.Schema(
  {
   amount:{
     type:String
   },
   item:{
    type:String,
   }
   ,
   date:{
    type:Date
   },
   note:{
    type:String
   },
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
   }

  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", exSchema);
export default Expense;
