function calctotalmealcal(meals){
    console.log(meals);
    meals.totalcalories.carb=0;
    meals.totalcalories.fat=0;
    meals.totalcalories.prot=0;
    meals.totalcalories.cal=0;
    for(var i=0; i<meals.myFooditemsList.length;i++){
        meals.totalcalories.carb=meals.totalcalories.carb+meals.myFooditemsList[i].food.carb*meals.myFooditemsList[i].quantity;
        meals.totalcalories.fat=meals.totalcalories.fat+meals.myFooditemsList[i].food.fat*meals.myFooditemsList[i].quantity;
        meals.totalcalories.prot=meals.totalcalories.prot+meals.myFooditemsList[i].food.prot*meals.myFooditemsList[i].quantity;
        meals.totalcalories.cal=meals.totalcalories.cal+meals.myFooditemsList[i].food.cal*meals.myFooditemsList[i].quantity;
    }
}

function calctotalcal(day){
    console.log(day);
    day.totalcalories.carb=0;
    day.totalcalories.fat=0;
    day.totalcalories.prot=0;
    day.totalcalories.cal=0;
    for(var i=0; i<day.daymeals.length;i++){
        day.totalcalories.carb= day.daymeals[i].totalcalories.carb+day.totalcalories.carb;
        day.totalcalories.fat= day.daymeals[i].totalcalories.fat+day.totalcalories.fat;
        day.totalcalories.prot= day.daymeals[i].totalcalories.prot+day.totalcalories.prot;
        day.totalcalories.cal= day.daymeals[i].totalcalories.cal+day.totalcalories.cal;
    }

};

module.exports = {calctotalcal,calctotalmealcal};


