const express = require('express');
const router = express.Router();

const Day = require('../models/Day');



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