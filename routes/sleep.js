const express = require('express');
const router = express.Router();

const Day = require('../models/Day');
const User= require('../models/User');

//add sleep to a day (create day if that day doesn't exists)
router.post('/user/:id/day/:date',(req,res,next)=>{
  Day.findOne({$and:[{owner: req.params.id},{date: req.params.date}]})
  .then(day=>{

      const newSleep={
        startTime:req.body.startTime, 
        duration:req.body.duration,
        notes:req.body.notes
      }

      if(day!==null){

        Day.findByIdAndUpdate(day._id,{$push:{sleep:newSleep}},{new:true})
          .then(updatedDay=>{
            console.log('day updated with:',updatedDay);
            res.status(204).json(updatedDay);
          })
          .catch(err=>{
            console.log('there was an error updating sleep:',err);
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
          sleep:[newSleep],
          symptoms:[],
          energy:null,
          owner:req.params.id
        }

        Day.create(newDay)
          .then(dbDay=>{
            console.log('day created:',newDay)
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

//edit an existing sleep entry
router.put('/user/:id/day/:date',(req,res,next)=>{
  Day.findOne({$and:[{owner: req.params.id},{date: req.params.date}]})
  .then(day=>{
    if(day!==null){
      const filteredSleep = day.sleep.filter(sleep => sleep._id == req.body.data[0])
      const index = day.sleep.indexOf(filteredSleep[0])
      
      const sleepArr=[...day.sleep];
      // console.log('array before editing',exercisesArr)
      sleepArr[index].startTime=req.body.data[1].startTime;
      sleepArr[index].notes=req.body.data[1].notes;
      sleepArr[index].duration=req.body.data[1].duration;
      // console.log('after editing',exercisesArr)
      
        Day.findByIdAndUpdate(day._id,{sleep:sleepArr},{new:true})
          .then(updatedDay=>{
            console.log('sleep was updated',updatedDay);
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



//delete sleep from a day
router.delete('/user/:id/day/:date',(req,res,next)=>{
  Day.findOne({$and:[{owner: req.params.id},{date: req.params.date}]})
    .then(day=>{

      Day.findByIdAndUpdate(day._id,
        {$pull:
          {sleep:
            { 
              startTime: req.body.startTime,
              duration:req.body.duration
            }}},{new:true})
        .then(updatedDay=>{
          console.log(req.params, updatedDay);
          res.status(204).json(updatedDay);
        })
        .catch(err=>{
          console.log('there was an error deleting sleep',err);
          res.json(err);
        })
    })
    .catch(err=>{
      console.log('there was an error finding the day',err);
      res.json(err);
    })
})


module.exports = router;