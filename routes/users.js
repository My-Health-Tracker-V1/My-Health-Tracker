const express = require('express');
const mongoose =require('mongoose');
const router = express.Router();

const User = require('../models/User');
const Day = require('../models/Day')

// get all the Users
router.get('/', (req, res, next) => {
  User.find()
    .populate('days')
    .populate({
      path: 'foods',
      populate:{
        path: 'ingredients',
        model: 'Ingredient'
      }
    })
    .then(users => {
      console.log(users)
      res.status(200).json(users);
    })
    .catch(err => {
      res.json(err);
    })

});

// get a specfic User
// to check if id is a valid mongo object id: mongoose.Types.ObjectId.isValid(_id)
router.get('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.findById(req.params.id)
    .populate('days')
    .populate({
      path: 'foods',
      populate:{
        path: 'ingredients',
        model: 'Ingredient'
      }
    })
    .then(user => {
      console.log('this is the response', user)
      if (!user) {
        console.log('no User');
        res.status(404).json(user);
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      res.json(err);
    })
});


// update a User Profile, allow to change username and password
router.put('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const { username, password } = req.body;
  User.findByIdAndUpdate(
    req.params.id, { username, password },
    // this ensures that we are getting the updated document as a return 
    { new: true }
  )
    .then(() => {
      res.json({ message: `Userprofile with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
    })
});

router.delete('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: `Project with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
});




module.exports = router;