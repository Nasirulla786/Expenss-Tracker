import mongoose from "mongoose";


const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL );
        console.log("db connect sucessfully");

    } catch (error) {

        console.log("db error" , error);
    }
}


export default dbConnect;
