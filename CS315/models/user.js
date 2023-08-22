var mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const {Day}=require("./day.js");
const {FoodItem} =require("./fooditem.js");
const userSchema=mongoose.Schema({
    title:String,
    daysList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Day'
    }],
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
    }
})

const User=mongoose.model("User",userSchema);
module.exports={User};