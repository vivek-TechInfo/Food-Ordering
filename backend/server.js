import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"



// app config
const app =  express()
const port  = 4000

// vivek31781877 
// vivekstack

//middleware
app.use(express.json())  // frontend se jo data aaye ga usko json me convert kar ke dega
app.use(cors()) // access the backed from frontend

//database connection
connectDB()

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
 
app.get("/",(req,res)=>{

    res.send("Jai Sri RadhaKrishn")

})

app.listen(port,()=>{
    console.log(`server is started in http://localhost:${port}`);
})

