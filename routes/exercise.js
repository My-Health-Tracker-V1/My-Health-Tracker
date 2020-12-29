const express = require('express');
const router = express.Router();

const Day = require('../models/Day');
const User= require('../models/User');

router.post('/user/:id/day/:date',(req,res,next)=>{

  Day.findOne({$and:[{owner: req.params.id},{date: req.params.date}]})
    .then(day=>{
      const newExercise={
        startTime:req.body.startTime,
        name:req.body.name,
        intensityLevel:req.body.intensityLevel,
        duration:req.body.duration
      };
      if(day!==null){
        Day.findByIdAndUpdate(day._id, {$push:{exercises:newExercise}},{new:true})
          .then(updatedDay=>{
            res.status(204).json(updatedDay);
          })
          .catch(err=>{
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
          exercises: [newExercise],
          sleep: [],
          symptoms:[],
          energy: null,
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
            res.json(err)
          })
        
      }
    })
    .catch(err=>{
      res.json(err);
    })
})

router.put('/user/:id/day/:date',(req,res,next)=>{
  Day.findOne({$and:[{owner: req.params.id},{date: req.params.date}]})
  .then(day=>{
      const filteredExercise = day.exercises.filter(exercise => exercise._id == req.body.data[0])
      const index = day.exercises.indexOf(filteredExercise[0])
      
      const exercisesArr=[...day.exercises];

      exercisesArr[index].startTime=req.body.data[1].startTime;
      exercisesArr[index].name=req.body.data[1].name;
      exercisesArr[index].intensityLevel=req.body.data[1].intensityLevel;
      exercisesArr[index].duration=req.body.data[1].duration;
      
        Day.findByIdAndUpdate(day._id,{exercises:exercisesArr},{new:true})
          .then(updatedDay=>{
            res.status(201).json(updatedDay);
          })
          .catch(err=>res.json(err))

    }).catch(err=>{
      res.json(err);
    })

})

router.delete('/user/:id/day/:date',(req,res,next)=>{

  Day.findOne({$and:[{owner: req.params.id},{date: req.params.date}]})
    .then(day=>{
      
      Day.findByIdAndUpdate(day._id,{$pull:
        {exercises:
          { 
            name: req.body.name, 
            startTime: req.body.startTime,
            intensityLevel:req.body.intensityLevel,
            duration: req.body.duration
          }}},{new:true})
        .then(updatedDay=>{
          res.status(204).json(updatedDay);
        })
        .catch(err=>{
          res.json(err);
        })
    })
    .catch(err=>{
      res.json(err);
    })
})

module.exports = router;