const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.post('/signup', (req, res, next) => {
  const { email, password } = req.body;

  if (password.length < 8) {
    return res.status(400).json({ message: 'Your password must be 8 chars minimum' });
  }
  if (email === '') {
    return res.status(400).json({ message: 'Your email cannot be empty' });
  }
  
  User.findOne({ email: email })
    .then(found => {
      if (found !== null) {
        return res.status(400).json({ message: 'Your email is already taken' });
      } else {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);

        User.create({
          email: email,
          password: hash,
        })
          .then(dbUser => {
            req.login(dbUser, err => {
              if (err) {
                return res.status(500).json({ message: 'Error while attempting to login' })
              }
              return res.status(200).json(dbUser);
            });
          })
          .catch(err => {
            res.json(err);
          })
      }
    })
})

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error while authenticating' });
    }
    if (!user) {
      return res.status(400).json({ message: 'Wrong credentials' });
    }
    req.login(user, err => {
      if (err) {
        return res.status(500).json({ message: 'Error while attempting to login' })
      }
      return res.status(200).json(user);
    })
  })(req, res)
});

router.delete('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Successful logout' });
})

router.get('/loggedin', (req, res) => {
  res.json(req.user);
})

module.exports = router;