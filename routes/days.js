const express = require('express');
const router = express.Router();

const Day = require('../models/Day');


// Get the days from one user.For analysis later
router.get('/user/:id',(req,res,next)=>{
  console.log('this is the user id', req.params.id)
  console.log('this is the req',req.body)
  Day.find({owner: req.params.id})
    .populate('owner')
    .populate({
      path: 'foods',
      populate:{
        path: 'ingredients',
        model: 'Ingredient'
      }
    })
    .then(day=>{
      console.log('this is the day',day)
      res.json(day)
      }
    )
    .catch(err => console.log(err))
})

router.get('/user/:id/day/:date/',(req,res,next)=>{

  Day.findOne({$and:[{owner: req.params.id},{date: req.params.date}]})
    .populate({
      path: 'foods',
      populate:{
        path: 'ingredients',
        model: 'Ingredient'
      }
    })
    .then(day=>{
      res.json(day)
      }
    )
    .catch(err => console.log(err))
})

module.exports = router;