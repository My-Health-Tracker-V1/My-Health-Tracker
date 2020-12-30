const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const Day = require('../models/Day');
const User = require('../models/User');
const Ingredient = require('../models/Ingredient');
 
 // LoggedIn user want to create a drink Ingredient
 router.post('/user/:id/day/:date', (req, res) => {
  const { date, startTime, name, brand, category, servingAmount, servingSize, portion, eatenPortion } = req.body;
  // const owner = req.user._id;
  // Check if the user already has a day
console.log('this is req.params.id', req.params)
 Day.findOne({$and: [{owner: req.params.id}, {date: req.params.date}]})
  .then (day => {
    console.log('this is the day', day)
    if(day !== null) {
      Ingredient.create({
        name,
        brand,
        category,
        servingAmount,
        servingSize,
        owner: req.params.id
      })
      .then(dbIngredient => {
        console.log('this is the dbingredient', dbIngredient)
        Day.findByIdAndUpdate(day._id,
          { $push: {"drinks": 
            {startTime,
            name,
            brand,
            category,
            imgUrl: "",
            ingredients: dbIngredient
        }}}, {new: true}).then(dbIngredient => {
          res.status(201).json(dbIngredient);
        })
        .catch(err => {
          res.json(err);
        })
      })
    } else {
      Ingredient.create({
        name,
        brand,
        category,
        servingAmount,
        servingSize,
        owner: req.params.id
      })
        .then((dbIngredient) => {
          Day.create({
            date: date,
            owner: req.params.id,
            drinks: [{
              startTime: startTime,
              imgUrl: "",
              name,
              brand,
                // ingredients are obejcts
              ingredients: [dbIngredient]
            }],
            foods:[],
            supplements: [],
            medications: [],
            exercises: [],
            sleep:[],
            symptoms: [],
            energy: ""
          })
          .then((dbDay) => {
            User.findByIdAndUpdate(req.params.id, {
              $push: { days: dbDay._id },
            })
          })
        })
        .then(dbIngredient => {
          res.status(201).json(dbIngredient);
        })
        .catch(err => {
          res.json(err);
        })
    }
  })
})

module.exports = router;