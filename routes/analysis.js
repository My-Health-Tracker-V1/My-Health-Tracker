const express = require('express');
const router = express.Router();

const Day = require('../models/Day');

router.get('/user/:id/options',(req,res,next)=>{
  Day.find({owner: req.params.id})
    .then(days=>{
      const daysWithSymptoms = days.filter(day=>day.symptoms.length>0);
      const userSymptoms = [];
      daysWithSymptoms.forEach(day=>
        day.symptoms.forEach(
          symptom=>{
            if(!userSymptoms.includes(symptom.name))
            userSymptoms.push(symptom.name)}))
      
        
      const daysWithEnergy = days.filter(day=>typeof day.energy.energyLevel==='number');
      if(daysWithEnergy.length>0)
        res.json([...userSymptoms,"Energy"])
      else
        res.json(userSymptoms)

      }
    )
    .catch(err => console.log(err))
})

router.get('/user/:id/selected-data/:data',(req,res,next)=>{

})


module.exports = router;
