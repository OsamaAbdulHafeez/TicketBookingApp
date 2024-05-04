import mongoose from "mongoose";

export const dbConnection = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database Connnected")
    } catch (error) {
        console.log(error)
    }
}