const express = require('express');
const router = express.Router();

const Day = require('../models/Day');
const User= require('../models/User');

//add exercise to a day (create day if that day doesn't exists)
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
            console.log('day updated:',updatedDay);
            res.status(204).json(updatedDay);
          })
          .catch(err=>{
            console.log('there was an error updating the energy:',err);
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
            console.log(err)
            res.json(err)
          })
        
      }
    })
    .catch(err=>{
      res.json('there was a problem finding the day',err);
    })
})

//edit an existing exercise
router.put('/user/:id/day/:date',(req,res,next)=>{
  Day.findOne({$and:[{owner: req.params.id},{date: req.params.date}]})
  .then(day=>{
    if(day!==null){
      const filteredExercise = day.exercises.filter(exercise => exercise._id == req.body.data[0])
      const index = day.exercises.indexOf(filteredExercise[0])
      
      const exercisesArr=[...day.exercises];
      // console.log('array before editing',exercisesArr)
      exercisesArr[index].startTime=req.body.data[1].startTime;
      exercisesArr[index].name=req.body.data[1].name;
      exercisesArr[index].intensityLevel=req.body.data[1].intensityLevel;
      exercisesArr[index].duration=req.body.data[1].duration;
      // console.log('after editing',exercisesArr)
      
        Day.findByIdAndUpdate(day._id,{exercises:exercisesArr},{new:true})
          .then(updatedDay=>{
            console.log('the exercise was updated',updatedDay);
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


//delete exercise from a day
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
          console.log('there was an error deleting the energy',err);
          res.json(err);
        })
    })
    .catch(err=>{
      console.log('there was an error finding the day',err);
      res.json(err);
    })
})


module.exports = router;