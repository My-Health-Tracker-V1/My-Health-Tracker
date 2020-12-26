const express = require('express');
const router = express.Router();

const Day = require('../models/Day');
const User= require('../models/User');

//add symptom to a day (create day if that day doesn't exists)
router.post('/user/:id/day/:date',(req,res,next)=>{
  Day.findOne({$and:[{owner: req.params.id},{date: req.params.date}]})
    .then(day=>{

      const newSymptom={
        name:req.body.name,
        startTime:req.body.startTime, 
        intensity: req.body.intensity,
        notes: req.body.notes
      }

      if(day!==null){
        Day.findByIdAndUpdate(day._id,{$push:{symptoms:newSymptom}},{new:true})
          .then(updatedDay=>{
            console.log('day updated:',updatedDay);
            res.status(204).json(updatedDay);
          })
          .catch(err=>{
            console.log('there was an error updating symptoms:',err);
            res.json(err);
          })
      }
      else{
        const newDay={
          date:req.body.startDate,
          foods:[],
          drinks: [],
          supplements: [],
          medications: [],
          exercises: [],
          sleep: [],
          symptoms:[newSymptom],
          energy:null,
          owner:req.params.id
        }
        Day.create(newDay)
          .then(dbDay=>{
            console.log('day created:',dbDay)
            User.findByIdAndUpdate(req.params.id,{$push:{days:dbDay._id}})
              .then(user=>{
                res.status(201).json(dbDay)
              })
          })
          .catch(err=>{
            console.log(err)
            res.json(err)
          })
      }
    })
    .catch(err=>{
      res.json(err);
    })
})

//edit an existing symptom
router.put('/user/:id/day/:date',(req,res,next)=>{
  Day.findOne({$and:[{owner: req.params.id},{date: req.params.date}]})
  .then(day=>{
    if(day!==null){

      const filteredSymptom = day.symptoms.filter(symptom => symptom._id == req.body.data[0])
      const index = day.symptoms.indexOf(filteredSymptom[0])
      
      const symptomArr=[...day.symptoms];
      // console.log('array before editing',symptomArr)
      symptomArr[index].startTime=req.body.data[1].startTime;
      symptomArr[index].name=req.body.data[1].name;
      symptomArr[index].intensity=req.body.data[1].intensity;
      symptomArr[index].notes=req.body.data[1].notes;
      // console.log('after editing',symptomArr)
      
        Day.findByIdAndUpdate(day._id,{symptoms:symptomArr},{new:true})
          .then(updatedDay=>{
            console.log('the symptom was updated',updatedDay);
            res.status(201).json(updatedDay);
          })
          .catch(err=>res.json(err))
      }
      else{
        console.log('this day does not exists');
      }
    }).catch(err=>{
      res.json('there was a problem finding the day',err);
    })

})

//delete energy level to a day
router.delete('/user/:id/day/:date',(req,res,next)=>{

  Day.findOne({$and:[{owner: req.params.id},{date: req.params.date}]})
    .then(day=>{
      console.log('this symptom i want to erase',req.body)
      Day.findByIdAndUpdate(day._id,
        {$pull:
          {symptoms:
            { 
              name: req.body.name, 
              startTime: req.body.startTime,
              intensity:req.body.intensity
            }}},{new:true})
        .then(updatedDay=>{
          console.log(req.params, updatedDay);
          res.status(204).json(updatedDay);
        })
        .catch(err=>{
          console.log('there was an error deleting the symptom',err);
          res.json(err);
        })
    })
    .catch(err=>{
      console.log('there was an error finding the day',err);
      res.json(err);
    })
})


module.exports = router;