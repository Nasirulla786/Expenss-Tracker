import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userdata/userslice"
import expenseReducer from "./userdata/expenseSlice"



const store =  configureStore({
    reducer:{
        user : userReducer,
        expense : expenseReducer

    }
})


export default store
