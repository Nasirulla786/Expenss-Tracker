import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name:"expenseData",
    initialState:{
        expenseData:null
    },
    reducers:{
        setExpenseData:(state, action)=>{
            state.expenseData = action.payload
        }
    }
})

export const {setExpenseData} = expenseSlice.actions;
export default expenseSlice.reducer;
