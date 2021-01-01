const express = require('express');
const router = express.Router();

const Day = require('../models/Day');


const userOptions = (input,days) =>{

  const userOptions=[];

  const daysWithInput = days.filter(day=>day[input].length>0);

  if(daysWithInput.length>0){

    daysWithInput.forEach(day=>
      day[input].forEach(
        inputElement=>{
          if(!userOptions.includes(inputElement.name))
          userOptions.push(inputElement.name)}))
  }

  return userOptions;
}

const getDataFromDay=(day,event,specificEvent)=>{
  
  switch(event){

    case "Sleep":
        return day.sleep[0].duration+''

    case "Exercise":
        let totalDuration=0;
        if(day.exercises.length>0){
          if(specificEvent.substring(0,3)==="All"){
            day.exercises.forEach(exercise=>totalDuration+=exercise.duration);
          }else{
            day.exercises.forEach(exercise=>{
              console.log(day.date,exercise.name,exercise.duration)
              if (exercise.name===specificEvent)
              totalDuration+=exercise.duration} );
          }
        }else
          totalDuration=''
        return totalDuration+'';

    case "Foods":
      let totalFoodConsumption=0;
      if(day.foods.length>0){
        if(specificEvent.substring(0,3)==="All"){
          day.foods.forEach(food=>totalFoodConsumption+=food.eatenPortions);
        }else{
          day.foods.forEach(food=>{
            if (food.name===specificEvent)
            totalFoodConsumption+=food.eatenPortions} );
        }
      }else
        totalFoodConsumption='';
      return totalFoodConsumption+'';

    case "Drinks":
      let totalDrinkConsumption=0;
      if(day.drinks.length>0){
        if(specificEvent.substring(0,3)==="All"){
          day.drinks.forEach(drink=>totalDrinkConsumption+=drink.servingAmount);
        }else{
          day.drinks.forEach(drink=>{
            if (drink.name===specificEvent)
            totalDrinkConsumption+=drink.servingAmount} );
        }
      }else
        totalDrinkConsumption=''
      return totalDrinkConsumption+'';

    default:

  }

}

router.get('/user/:id/options',(req,res,next)=>{
  Day.find({owner: req.params.id})
    .then(days=>{
    
      //const userOutcomes=[...userOptions('symptoms',days)];

      const userOutcomes=[];
    
      const daysWithSymptoms = days.filter(day=>day.symptoms.length>0);

      if(daysWithSymptoms.length>0){

        daysWithSymptoms.forEach(day=>
          day.symptoms.forEach(
            symptom=>{
              if(!userOutcomes.includes(symptom.name))
              userOutcomes.push(symptom.name)}))
      }

      userOutcomes.sort().unshift("Choose an option");

      const daysWithEnergy = days.filter(day=>typeof day.energy.energyLevel==='number');

      if(daysWithEnergy.length>0){
        userOutcomes.splice(1,0,"Energy")
      }

      const userEvents=[];

      const userExercises=[];
      const daysWithExercises = days.filter(day=>day.exercises.length>0);
      if(daysWithExercises.length>0){

        userEvents.push("Exercise")

        daysWithExercises.forEach(day=>
          day.exercises.forEach(
            exercise=>{
              if(!userExercises.includes(exercise.name))
              userExercises.push(exercise.name)
            }));
        
        userExercises.sort().unshift("Choose an option","All exercises");
      }
      

      const daysWithSleep = days.filter(day=>day.sleep.length>0);

      if(daysWithSleep.length>0){
        userEvents.push("Sleep")
      }

      const userFoods=[];
      const userIngredients=[];
      const daysWithFoods = days.filter(day=>day.foods.length>0);

      if(daysWithFoods.length>0){

        userEvents.push("Foods")
        
         daysWithFoods.forEach(day=>
           day.foods.forEach(
             food=>{
               if(!userFoods.includes(food.name)){
                 userFoods.push(food.name)
        //         food.ingredients.forEach(
        //           ingredient=>{
        //             if(!userIngredients.includes(ingredient.name))
        //               userIngredients.push(ingredient.name);
        //           }
        //         )
                  
               }
             }
           )
         )
      
        userFoods.sort().unshift("Choose an option","All Foods");   
        
      }

      const userDrinks=[];
      const daysWithDrinks = days.filter(day=>day.drinks.length>0);

      if(daysWithDrinks.length>0){

        userEvents.push("Drinks")
        
        daysWithDrinks.forEach(day=>
           day.drinks.forEach(
             drink=>{
               if(!userDrinks.includes(drink.name)){
                userDrinks.push(drink.name)
        //         food.ingredients.forEach(
        //           ingredient=>{
        //             if(!userIngredients.includes(ingredient.name))
        //               userIngredients.push(ingredient.name);
        //           }
        //         )
               }
             }
           )
         )
      userDrinks.sort().unshift("Choose an option","All Drinks");   
    }

    userEvents.sort().unshift("Choose an option");   

    res.json({
      userOutcomes:userOutcomes,
      userEvents:userEvents,
      Exercise:userExercises,
      Foods:userFoods,
      Drinks: userDrinks
    })

    })
    .catch(err => res.json(err))
  })

 router.get('/user/:id/selected-data/:outcome/:event/:specificEvent',(req,res,next)=>{
  
  if(req.params.outcome==='Energy'){
    
    Day.find({$and:[{owner: req.params.id},{energy:{$exists:true}}]})
    .then(days=>{
      const dataArr=[{"name":"Energy","data":{}},{"name":req.params.specificEvent, "data":{}}];
      days.forEach(day=>{
        dataArr[0]["data"][day.date]=day.energy.energyLevel+'';
        //console.log(day.date,getDataFromDay(day,req.params.event,req.params.specificEvent))
        if(getDataFromDay(day,req.params.event,req.params.specificEvent))
          dataArr[1]["data"][day.date]=getDataFromDay(day,req.params.event,req.params.specificEvent);
      });
      res.json(dataArr)
    })
    .catch(err=>res.json(err))

  }else{
    Day.find({$and:[{owner: req.params.id},{symptoms: {name:req.params.outcome}}]})
    .then(days=>{
      console.log(days)
    })
    .catch(err=>res.json(err))
  }
  
 })


module.exports = router;
