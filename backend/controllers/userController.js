import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from"bcrypt"
import validator from "validator";


//login user
const loginUser = async (req,res)=>{
    
    const {email, password} =  req.body

    try {
        const user =  await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"User doesn't exist"})

        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){

            return res.json({success:false,message:"Invalid credentials"})


        }

        const token = createToken(user._id);
        res.json({success:true,token,message:"Login successful"})


    } catch (error) {

        console.log(error)
        res.json({success:false,message:"Error"})
        
    }

}

//token

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)

}

//register  user

const registerUser = async (req,res)=>{
    
    
    const {name,email,password} =  req.body
    try {
        //checking is user hai ya nhi
        const exists =  await userModel.findOne({email})

        if(exists){
            return res.json({success:false,message:"User already exists"})
        }

        if(!validator.isEmail(email)){

            return res.json({success:false,message:"Please enter a valid email"})


        }

        if(password.length<8){
            return res.json({success: false , message : 'Please enter strong password' })
        }


        //bcrypt the password
        const salt = await bcrypt.genSalt(10)
        const hashedPasword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPasword
        })


        const user = await newUser.save()
        const token =  createToken(user._id)
        res.json({success:true,token,message:"Your account is register"})




        
    } catch (error) {

        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}


export {loginUser, registerUser}


