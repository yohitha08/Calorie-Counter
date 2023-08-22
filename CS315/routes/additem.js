var express = require('express');
var router = express.Router();
const {FoodItem} =require("../models/fooditem.js");
const {userFoodq}=require("../models/userFoodq.js");
const {Daymeals}=require("../models/daymeals.js");
const {Day}=require("../models/day.js");
const {User}=require("../models/user.js");
const helper=require("../public/js/helper.js");



var mymain=require("./main");
var user=mymain.user;

router.post("/",async(req,res)=>{
    var allfoods=await FoodItem.find({});
    var fooditem=await FoodItem.findOne({_id:req.body.itemtoadd});
    
    console.log("additem",req.body);
    // res.send(req.body);
    console.log("additem",user);
    for(var i=0; i<user.daysList.length;i++){
        
        if(user.daysList[i]._id==req.body.Dayname){
            for(var j=0; j<user.daysList[i].daymeals.length;j++){
                if(user.daysList[i].daymeals[j]._id==req.body.Mealname){
                    var flag=0
                    for(var k=0; k<user.daysList[i].daymeals[j].myFooditemsList.length;k++){
                        if(user.daysList[i].daymeals[j].myFooditemsList[k].food_id==req.body.itemtoadd){
                            user.daysList[i].daymeals[j].myFooditemsList[k].quantity=user.daysList[i].daymeals[j].myFooditemsList[k].quantity+1;
                            flag=1;
                        }
                    }
                    if(flag==0){
                        var ufoodq=new userFoodq({
                            food_id:req.body.itemtoadd,
                            quantity:1,
                            food:fooditem
                        })
                        user.daysList[i].daymeals[j].myFooditemsList.push(ufoodq);
                    }
                    helper.calctotalmealcal(user.daysList[i].daymeals[j]);
                    helper.calctotalcal(user.daysList[i]);
                    res.render("../views/index",  {daymealsList:user.daysList[i].daymeals, daysList:user.daysList, totalcalories:user.daysList[i].totalcalories, FooditemsList:allfoods, dayName:user.daysList[i]._id});
                }
            }
        }
    }

})



module.exports = router;