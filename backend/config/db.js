import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://vivekstack:vivek31781877@cluster0.obfkf6c.mongodb.net/food-del').then(()=>{
        console.log("Database Connected")
    }).catch((err)=>{
        console.log('Server is not connected   ',err)
    })

}