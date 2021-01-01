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
        
        userExercises.sort().unshift("Choose an option");
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
      
        userFoods.sort().unshift("Choose an option");   
        
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
      userDrinks.sort().unshift("Choose an option");   
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
  console.log('getting selected data heeeeeeeere!!!!', req.params)
  if(req.params.outcome==='Energy'){
    Day.find({$and:[{owner: req.params.id},{energy: {energyLevel:{$exists:true}}}]})
    .then(days=>{
      console.log(days)
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
