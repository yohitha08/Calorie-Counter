var express = require('express');
var router = express.Router();
const {FoodItem} =require("../models/fooditem.js");
const {userFoodq}=require("../models/userFoodq.js");
const {Daymeals}=require("../models/daymeals.js");
const {Day}=require("../models/day.js");
const {User}=require("../models/user.js");
const helper=require("../public/js/helper.js");
// const calctotalmealcal=require("../public/js/helper.js");

var mymain=require("./main");
var user=mymain.user;



router.post("/",async(req,res)=>{
    var allfoods=await FoodItem.find({});
    var fooditem=await FoodItem.findOne({_id:req.body.itemtoadd});
    var dname=req.body.Dayname;
    console.log("user",user,dname);
    for(var i=0; i<user.daysList.length;i++){
        if(user.daysList[i]._id==dname){
            var meal=new Daymeals({
                title:'Meal '+(user.daysList[i].daymeals.length+1).toString(10),
            })
            var myfood=new userFoodq({
                food_id:fooditem._id,
                quantity:1,
                food:fooditem
            })
            meal.myFooditemsList.push(myfood);
            user.daysList[i].daymeals.push(meal);
            j=user.daysList[i].daymeals.length-1
            helper.calctotalmealcal(user.daysList[i].daymeals[j]);
            helper.calctotalcal(user.daysList[i]);
            res.render("../views/index",  {daymealsList:user.daysList[i].daymeals, daysList:user.daysList, totalcalories:user.daysList[i].totalcalories,FooditemsList:allfoods,dayName:dname});
        }
    }
    
    
    

})



module.exports = router;





