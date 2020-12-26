// const express = require('express');
// const router  = express.Router();
// const User = require('../models/User');
// const Day = require('../models/Day');

// /* GET home page */
// router.get('/users', (req, res, next) => {
//   console.log('Request for all users')
//   User.find()
//     .then(users => {
//       res.status(200).json(users);
//     })
//     .catch(err => {
//       res.json(err);
//     })
// });

// router.get('/:id', (req, res, next) => {
//   console.log('Request for a specific users data')
//   // console.log(req)
//   Days.find({owner: req.params.id})
//     .then(days => {
//       res.status(200).json(days);
//     })
//     .catch(err => {
//       res.json(err);
//     })
// });


// module.exports = router;
