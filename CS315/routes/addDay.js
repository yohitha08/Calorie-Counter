var express = require('express');
const {FoodItem} =require("../models/fooditem.js");
const { Day } = require('../models/day');
var router = express.Router();
const helper=require("../public/js/helper.js");
var totalcalories= {
    title:'',
    carb:0,
    fat:0,
    prot:0,
    cal:0
};
var mymain=require("./main");
var user=mymain.user;
router.post("/",async(req,res)=>{
    var allfoods=await FoodItem.find({});
    var i=user.daysList.length;
    var day=new Day({
        daysList:[],
        title:'Day '+ (user.daysList.length+1).toString(10),
        user_id:mymain.user._id,
        totalcalories:totalcalories
    });
    
    user.daysList.push(day);
    console.log("came hello",user);
    helper.calctotalcal(user.daysList[i]);
    res.render("../views/index",  {daymealsList:user.daysList[i].daymeals, daysList:user.daysList, totalcalories:user.daysList[i].totalcalories,FooditemsList:allfoods,dayName:day._id});
})

module.exports = router;