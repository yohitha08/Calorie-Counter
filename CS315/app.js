var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const request=require("request");
const https=require("https");
const {FoodItem} =require("./models/fooditem.js");
const {userFoodq}=require("./models/userFoodq.js");
const {Daymeals}=require("./models/daymeals.js");
const {Day}=require("./models/day.js");
const {User}=require("./models/user.js");

var app=express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://yohitha:8897937674@cluster0.zhwj4qn.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true});
var db=mongoose.connection;
db.once('open',()=>{
    console.log("Connected to Database");
})
// var user= User.find({title:'myname'});


app.post("/addnewitem", async(req,res)=>{
    var data=req.body;
    console.log(data);
    const newitem=new FoodItem(data);
    newitem.save();
    res.redirect("/");

})



app.post("/user/quantity",(req,res)=>{
    var i=req.body.qitem;
    console.log(i);
    console.log(itemsList[i]);
    var old=itemsList[i].quantity;
    var newval=Number(req.body.quantity)
    itemsList[i].quantity=newval;
    if(newval<=0){
        itemsList.splice(i,i+1);
    }
    else{
        var fooditem=itemsList[i].food;
        totalcalories.carb=totalcalories.carb+fooditem.carb*(newval-old);
        totalcalories.fat=totalcalories.fat+fooditem.fat*(newval-old);
        totalcalories.prot=totalcalories.prot+fooditem.prot*(newval-old);
        totalcalories.cal=totalcalories.cal+fooditem.cal*(newval-old);
    }
    
    
    res.redirect("/");
})
// app.post("/deletefooditem/:itemid",(req,res)=>{
    
//     FoodItem.findByIdAndDelete((req.params.itemid),()=>{
//         res.redirect("/allFooditems");
//     });


// })



var main=require("./routes/main.js");
var addDay=require("./routes/addDay.js");
var addmeal=require("./routes/addmeal.js");
var additem=require("./routes/additem.js");

app.use("/",main);
app.use("/addDay",addDay);
app.use("/addmeal",addmeal);
app.use("/additem",additem);


app.listen(3000,()=>{
    console.log("server is running");
})



//api key = KT1yzRz9nthh2XlTGSXdiK1123kmvHD4cJ67yzhC

//example req
// https://api.nal.usda.gov/fdc/v1/foods/search?query=apple&pageSize=2&api_key=KT1yzRz9nthh2XlTGSXdiK1123kmvHD4cJ67yzhC
