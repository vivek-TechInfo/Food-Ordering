import foodModel from "../models/foodModel.js";

import fs from "fs"



//add food item

const addFood = async (req,res)=>{

    const {name,description,price,image,category} =  req.body

    let image_filename = `${req.file.filename}`

    const food =  new foodModel({
        name,
        description,
        price,
        image:image_filename,
        category,
    })


    try {
        await food.save();
        res.json({success:true,message:"food Added"})


        
    } catch (error) {

        console.log(error);
        res.json({success:false,message:"Error"})
        
    }




}



 const listFood = async (req,res)=>{

    try {

        const foods = await foodModel.find({})
        console.log(foods)

        res.json({success:true,data:foods})
        
    } catch (error) {
        console.log(error);

        res.json({success:false,message:"Error"})

        
    }





}

//Remove food item

const removeFood = async (req,res)=>{


    try {
        const foods =  await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${foods.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id)

        res.json({success:true,message:"Food Remove"})
        
    } catch (error) {

        console.log(error)
        res.json({success:false,message:"Error"})
        
    }


}


export {addFood,listFood,removeFood}