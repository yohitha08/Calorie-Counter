var express = require('express');
var router = express.Router();
const {FoodItem} =require("../models/fooditem.js");
const {userFoodq}=require("../models/userFoodq.js");
const {Daymeals}=require("../models/daymeals.js");
const {Day}=require("../models/day.js");
const {User}=require("../models/user.js");
var bodyParser = require('body-parser');
const helper=require("../public/js/helper.js");

var totalcalories= {
    title:'',
    carb:0,
    fat:0,
    prot:0,
    cal:0
};
var day=new Day({
    title: 'Day 1',
   daymeals:[],
    totalcalories:totalcalories,
});


var user=new User({
    daysList:[],
    totalcalories:totalcalories
});

var dayname="Day 1";

console.log(user._id);
var myname="hello world";
day.user_id=user._id;

user.daysList.push(day);




router.get("/",async(req,res)=>{
    
    //var dayname="Day 1";
    var allfoods=await FoodItem.find({});
    for(i=0;i<user.daysList.length;i++){
        if(user.daysList[i]._id==day._id){
            // console.log(dayname,user.daysList[0]);
            res.render("../views/index",  {daymealsList:user.daysList[i].daymeals, daysList:user.daysList, totalcalories:user.daysList[i].totalcalories,FooditemsList:allfoods,dayName:user.daysList[i]._id});
        }
    }
    
})
router.post("/",async(req,res)=>{

    var allfoods=await FoodItem.find({});
    user.daysList=[];
    user.totalcalories=totalcalories;
    user.daysList.push(day);

    var i=0;
    res.render("../views/index",  {daymealsList:user.daysList[i].daymeals, daysList:user.daysList, totalcalories:user.daysList[i].totalcalories,FooditemsList:allfoods,dayName:user.daysList[i]._id});

})

router.post("/day",async(req,res)=>{
    var allfoods=await FoodItem.find({});
    var dayname=req.body.dayname;
    var btnType=req.body.btnType;
    if(btnType=="show"){
        for(i=0;i<user.daysList.length;i++){
            if(user.daysList[i]._id==dayname){
                console.log(dayname,user.daysList[i]);
                helper.calctotalcal(user.daysList[i]);
                res.render("../views/index",  {daymealsList:user.daysList[i].daymeals, daysList:user.daysList, totalcalories:user.daysList[i].totalcalories,FooditemsList:allfoods, dayName:user.daysList[i]._id});
            }
        }

    }
    else if(btnType=="deleteDay"){
        for(i=0;i<user.daysList.length;i++){
            if(user.daysList[i]._id==dayname){
                user.daysList.splice(i,i+1);
                if(user.daysList.length==0){
                    user.daysList.push(day);
                }
                res.render("../views/index",  {daymealsList:user.daysList[0].daymeals, daysList:user.daysList, totalcalories:user.daysList[0].totalcalories,FooditemsList:allfoods, dayName:user.daysList[0]._id});
            }
        }
    }
    // console.log("dayname",dayname);
   
   
})

router.post("/removeitem",async(req,res)=>{
    var allfoods=await FoodItem.find({});
    // console.log(req.body);
    for(var i=0; i<user.daysList.length;i++){
        if(user.daysList[i]._id==req.body.riDayname){
            for(var j=0; j<user.daysList[i].daymeals.length;j++){
                if(user.daysList[i].daymeals[j]._id==req.body.riMealname){
                    for(var k=0; k<user.daysList[i].daymeals[j].myFooditemsList.length; k++){
                        if(user.daysList[i].daymeals[j].myFooditemsList[k]._id==req.body.removeitem){
                            user.daysList[i].daymeals[j].myFooditemsList.splice(k,k+1);
                            helper.calctotalmealcal(user.daysList[i].daymeals[j]);
                            helper.calctotalcal(user.daysList[i]);
                            res.render("../views/index",  {daymealsList:user.daysList[i].daymeals, daysList:user.daysList, totalcalories:user.daysList[i].totalcalories,FooditemsList:allfoods, dayName:req.body.riDayname})
                        }
                    }
                }
            }
        }
    }
        
    
})

router.post("/changeQuantity",async(req,res)=>{
    var allfoods=await FoodItem.find({});
    console.log(req.body);
    for(var i=0; i<user.daysList.length;i++){
        if(user.daysList[i]._id==req.body.dayname){
            for(var j=0; j<user.daysList[i].daymeals.length;j++){
                if(user.daysList[i].daymeals[j]._id==req.body.mealname){
                    for(var k=0; k<user.daysList[i].daymeals[j].myFooditemsList.length; k++){
                        if(user.daysList[i].daymeals[j].myFooditemsList[k]._id==req.body.itemid){
                            user.daysList[i].daymeals[j].myFooditemsList[k].quantity=(req.body.quantity);
                            helper.calctotalmealcal(user.daysList[i].daymeals[j]);
                            helper.calctotalcal(user.daysList[i]);
                            res.render("../views/index",  {daymealsList:user.daysList[i].daymeals, daysList:user.daysList, totalcalories:user.daysList[i].totalcalories,FooditemsList:allfoods, dayName:req.body.dayname})
                        }
                    }
                }
            }
        }
    }

})

router.post("/addData",async(req,res)=>{
    // console.log(req.body);
    var item=req.body
    var fooditem=new FoodItem({
        title:item.Foodname,
        carb:item.Foodcarb,
        fat:item.Foodfat,
        prot:item.Foodprot,
        cal:item.Foodcal,
        food_type:item.Foodcat
    })
    fooditem.save();
    var allfoods=await FoodItem.find({});
    var i=0;
    res.render("../views/index",  {daymealsList:user.daysList[i].daymeals, daysList:user.daysList, totalcalories:user.daysList[i].totalcalories,FooditemsList:allfoods, dayName:req.body.dayname})
})

router.post("/deleteMenu",async(req,res)=>{
    console.log(req.body);
    var allfoods=await FoodItem.find({});
    var menuid=req.body.Deleteitem;
    for(var i=0; i<user.daysList.length;i++){
        if(user.daysList[i]._id==req.body.dayname){
            console.log("came inside ", user.daysList[i].daymeals.length);
            
            for(var j=0; j< user.daysList[i].daymeals.length;j++){
                console.log(user.daysList[i].daymeals[j].title);
                if(user.daysList[i].daymeals[j]._id==menuid){
                    
                    console.log("came very inside");
                    user.daysList[i].daymeals.splice(j,j+1);
                    helper.calctotalmealcal(user.daysList[i].daymeals[j]);
                    helper.calctotalcal(user.daysList[i]);
                    res.render("../views/index",  {daymealsList:user.daysList[i].daymeals, daysList:user.daysList, totalcalories:user.daysList[i].totalcalories,FooditemsList:allfoods, dayName:req.body.dayname})
                }
            }
        }
    }
})


module.exports=router;
module.exports.me=myname;
module.exports.user=user;
module.exports.dayname=dayname;
