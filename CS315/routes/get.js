var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const fetch=require("node-fetch");
const {FoodItem} =require("../models/fooditem.js");
const { all } = require('./main.js');

mongoose.connect("mongodb+srv://yohitha:8897937674@cluster0.gdrsc.mongodb.net/FoodDatabase",{useNewUrlParser:true});
var db=mongoose.connection;

var allcategories=["Poultry", "Beef","Pork","fish","Dairy and eggs", "Grains and Pasta","Vegetables","Legumes & Legume Products","Fruits and Juices", "Fats and oils", "Fats & oils" , "Baked Products", "Sauces and Soups","Spices and herbs" ,"sweets and snacks", "beverages","others"]

getallcategories(allcategories);














// const params={
//     api_key: "KT1yzRz9nthh2XlTGSXdiK1123kmvHD4cJ67yzhC" ,
//     dataType:["SR Legacy"],


// }

// const api_url=`https://api.nal.usda.gov/fdc/v1/foods/search?query=cookies&api_key=KT1yzRz9nthh2XlTGSXdiK1123kmvHD4cJ67yzhC`

// function getData(){
//     return fetch(api_url)
//     .then(res=>res.json())
// }

// getData().then(data=>{

//     for(let j in data.foods){
//         let item=data.foods[j];
//         var fooditem=new FoodItem({
//             title:item.description,
//             food_type:item.foodCategory,
//             carb:0,
//             fat:0,
//             prot:0,
//             cal:0
//         })
//         //1003(prot), 1004(fat), 1005(carb), 1008(cal)
//         // console.log(item.description);
//         let a=0,b=0,c=0,d=0;
        
//         for( var i=0; i<item.foodNutrients.length;i++){
//             console.log(item.foodNutrients[i].nutrientId, item.foodNutrients[i].nutrientName);

//             if(item.foodNutrients[i].nutrientId=='1003'){
//                 fooditem.prot=Number(item.foodNutrients[i].value);
//                 a=1;
//             }
//             if(item.foodNutrients[i].nutrientId=='1004'){
//                 fooditem.fat=Number(item.foodNutrients[i].value);
//                 b=1;
//             }
//             if(item.foodNutrients[i].nutrientId=='1005'){
//                 fooditem.carb=Number(item.foodNutrients[i].value);
//                 c=1;
//             }
//             if(item.foodNutrients[i].nutrientId=='1008'){
//                 fooditem.cal=Number(item.foodNutrients[i].value);
//                 d=1;
//             }

//             if(a&&b&&c&&d){
//                 if(fooditem.cal && fooditem.carb && fooditem.fat && fooditem.prot ){
//                     check(fooditem);
//                 }
//                 break;
//             }
            

//         }

//         async function check(fooditem){
//             var foodl = await FoodItem.find({title:fooditem.title});
//             console.log(foodl.length);
//             if(foodl.length==0){
//                 console.log("came");
//                 fooditem.save();
//             }
//         }
        

//     }
    
//     console.log("done");
// })