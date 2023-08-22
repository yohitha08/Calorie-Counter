var mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const {Daymeals}=require("./daymeals.js");
const {FoodItem} =require("./fooditem.js");

const daySchema=mongoose.Schema({
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
    daymeals:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Daymeals'
    }],
    user_id:{
        type:String
    }

})

const Day=mongoose.model("Day",daySchema);
module.exports={Day};