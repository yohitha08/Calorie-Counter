var mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

// food schema

const FoodSchema=mongoose.Schema({
    title :{
        type: String,
        required : true
    },
    food_type :{
        type:String
    },
    carb :{
        type: Number
    },
    fat :{
        type: Number
    },
    prot :{
        type:  Number
    },
    
    cal :{
        type: Number
    }
})


const FoodItem=mongoose.model("FoodItem",FoodSchema);
module.exports={FoodItem};


