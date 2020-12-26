const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const Day = require('../models/Day');
const User = require('../models/User')

// get all the Days
router.get('/', (req, res, next) => {
  console.log('Requesting data from server')
  Day.find()
    .populate('owner')
    .populate({
      path: 'foods',
      populate:{
        path: 'ingredients',
        model: 'Ingredient'
      }
    })
    .then(days => {
      res.status(200).json(days);
    })
    .catch(err => {
      res.json(err);
    })
});

// Get the days from one user
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


//View all the entries of a specific day of a user
router.get('/user/:id/day/:date/',(req,res,next)=>{
  console.log('this is the user id', req.params.id)
  console.log('this is the req',req.body)
  Day.findOne({$and:[{owner: req.params.id},{date: req.params.date}]})
    // .populate('owner')
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


//add energy level to a day (create day if that day doesn't exists)
router.post('/user/:id/day/:date/energy',(req,res,next)=>{
  console.log('this is the user id', req.params.id)
  console.log('this is the req',req.body)
  Day.findOne({$and:[{owner: req.params.id},{date: req.params.date}]})
    .then(day=>{
      console.log('this is the day',day)
      if(day!==null){
        Day.findByIdAndUpdate(day._id,{energy:{startTime:req.body.startTime, energyLevel:req.body.energyLevel}},{new:true})
          .then(()=>console.log('day updated with:',{startTime:req.body.startTime, energyLevel:req.body.energyLevel}))
          .catch(err=>console.log('there was an error updating the energy:',err))
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
          energy:{startTime:req.body.startTime, energyLevel:req.body.energyLevel},
          owner:req.params.id
        }
        Day.create(newDay).then(()=>console.log('day created:',newDay))
          .catch(err=>console.log(err))

      }
    })
})

//delete energy level to a day
router.delete('/user/:id/day/:date/energy',(req,res,next)=>{
  console.log('deleting energy')
  Day.findOne({$and:[{owner: req.params.id},{date: req.params.date}]})
    .then(day=>{
      Day.findByIdAndUpdate(day._id,{energy:null},{new:true})
        .then(()=>console.log(req.params, day))
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log('there was an error deleting the energy',err))
})


// get a specfic Day
// to check if id is a valid mongo object id: mongoose.Types.ObjectId.isValid(_id)
router.get('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Day.findById(req.params.id)
    .populate('owner')
    .populate({
      path: 'foods',
      populate:{
        path: 'ingredients',
        model: 'Ingredient'
      }
    })
    .then(day => {
      if (!day) {
        console.log('no Day');
        res.status(404).json(day);
      } else {
        res.status(200).json(day);
      }
    })
    .catch(err => {
      res.json(err);
    })
});

// create a Day
router.post('/', (req, res) => {

  const owner = req.user._id;
  const {date, energy} = req.body
  console.log(req.body)
  Day.create({
    date,
    foods: [],
    exercises: [],
    symptoms: [],
    energy,
    owner
  })
    .then((dbDay) => {
      return User.findByIdAndUpdate(req.user._id, {
        $push: { days: dbDay._id },
      });
    })
    .then(dbDay => {
      res.status(201).json(dbDay);
    })
    .catch(err => {
      res.json(err);
    })
})

// update a Day
router.put('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  // const date = req.body.date.setHours(0,0,0,0)
  const owner = req.user._id;
  Day.findByIdAndUpdate(req.params.id,{ 
    date,
    foods: [],
    exercises: [],
    symptoms: [],
    owner 
  },
    { new: true }
  )
    .then(day => {
      console.log(day);
      res.status(200).json(day);
    })
    .catch(err => {

    })
});

router.delete('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Day.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'ok' })
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;