var mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const {userFoodq}=require("./userFoodq");
const {FoodItem} =require("./fooditem.js");

const mealSchema=mongoose.Schema({
    title:{
        type:String
    },
    totalcalories:{
        cal:{
            type:Number
        },
        carb:{
            type:Number
        },
        prot:{
            type:Number
        },
        fat:{
            type:Number
        }
    },
    myFooditemsList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userFoodq'
    }]
})

const Daymeals=mongoose.model("Daymeals",mealSchema);
module.exports={Daymeals};