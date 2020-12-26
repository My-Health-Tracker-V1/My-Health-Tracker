const express = require('express');
const router = express.Router();

const Day = require('../models/Day');
const User= require('../models/User');


//add energy level to a day (create day if that day doesn't exists)
router.post('/user/:id/day/:date',(req,res,next)=>{
  Day.findOne({$and:[{owner: req.params.id},{date: req.params.date}]})
    .then(day=>{
      const energyEntry={startTime:req.body.startTime, energyLevel:req.body.energyLevel}
      if(day!==null){
        Day.findByIdAndUpdate(day._id,{energy:energyEntry},{new:true})
          .then(updatedDay=>{
            console.log('day updated with:',energyEntry);
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
          exercises: [],
          sleep: [],
          symptoms:[],
          energy:energyEntry,
          owner:req.params.id
        }
        Day.create(newDay)
          .then(dbDay=>{
            console.log('day created:',newDay);
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

//edit an existing energy
router.put('/user/:id/day/:date',(req,res,next)=>{
  Day.findOne({$and:[{owner: req.params.id},{date: req.params.date}]})
  .then(day=>{
    if(day!==null){
      
      const updatedEnergy={
        startTime:req.body.data.startTime,
        energyLevel:req.body.data.energyLevel
      }
      // console.log('udated energy',updatedEnergy)

        Day.findByIdAndUpdate(day._id,{energy:updatedEnergy},{new:true})
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

//delete energy level to a day
router.delete('/user/:id/day/:date',(req,res,next)=>{
  Day.findOne({$and:[{owner: req.params.id},{date: req.params.date}]})
    .then(day=>{
      Day.findByIdAndUpdate(day._id,{energy:null},{new:true})
        .then(updatedDay=>{
          console.log(req.params, updatedDay);
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