
const User = require('../models/User.js');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user._id);
  console.log(`This is the user from passport`, user)
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(dbUser => {
      done(null, dbUser);
    })
    .catch(error => {
      done(error);
    })
});

passport.use(
  new LocalStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {
    User.findOne({ email: email })
      .then(found => {
        if (found === null) {
          done(null, false, { message: 'hahahhaWrong Credentials' })
        } else if (!bcrypt.compareSync(password, found.password)) {
          done(null, false, { message: 'hihihiWrong Credentials' })
        } else {
          done(null, found);
        }
      })
      .catch(error => {
        done(error, false);
      })
  })
)

//Google strategy HERE

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://localhost:5555/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // to see the structure of the data in received response:
      console.log("Google account details:", profile);

      User.findOne({ googleID: profile.id })
        .then((user) => {
          if (user) {
            done(null, user);
            return;
          }

          User.create({ googleID: profile.id })
            .then((newUser) => {
              done(null, newUser);
            })
            .catch((err) => done(err)); // closes User.create()
        })
        .catch((err) => done(err)); // closes User.findOne()
    }
  )
);