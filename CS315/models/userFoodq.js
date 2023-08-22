var mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const userFoodQuantitySchema=mongoose.Schema({
    food_id:{
        type:String,
        required:true
    },
    quantity:{
        type:Number
    },
    food:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodItem'
    }

})

const userFoodq=mongoose.model("userFoodq",userFoodQuantitySchema);
module.exports={userFoodq};