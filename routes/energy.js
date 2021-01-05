const express = require("express");
const router = express.Router();

const Day = require("../models/Day");
const User = require("../models/User");

router.post("/user/:id/day/:date", (req, res, next) => {
  Day.findOne({ $and: [{ owner: req.params.id }, { date: req.params.date }] })
    .then((day) => {
      const energyEntry = {
        startTime: req.body.startTime,
        energyLevel: req.body.energyLevel,
      };
      if (day !== null) {
        Day.findByIdAndUpdate(day._id, { energy: energyEntry }, { new: true })
          .then((updatedDay) => {
            res.status(204).json(updatedDay);
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        const newDay = {
          date: req.body.startDate,
          foods: [],
          drinks: [],
          supplements: [],
          medications: [],
          exercises: [],
          sleep: [],
          symptoms: [],
          energy: energyEntry,
          owner: req.params.id,
        };
        Day.create(newDay)
          .then((dbDay) => {
            User.findByIdAndUpdate(req.params.id, {
              $push: { days: dbDay._id },
            }).then((user) => {
              res.status(201).json(dbDay);
            });
          })
          .catch((err) => {
            res.json(err);
          });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/user/:id/day/:date", (req, res, next) => {
  Day.findOne({ $and: [{ owner: req.params.id }, { date: req.params.date }] })
    .then((day) => {
      const updatedEnergy = {
        startTime: req.body.data.startTime,
        energyLevel: req.body.data.energyLevel,
      };

      Day.findByIdAndUpdate(day._id, { energy: updatedEnergy }, { new: true })
        .then((updatedDay) => {
          res.status(201).json(updatedDay);
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/user/:id/day/:date", (req, res, next) => {
  Day.findOne({ $and: [{ owner: req.params.id }, { date: req.params.date }] })
    .then((day) => {
      Day.findByIdAndUpdate(day._id, { $unset: { energy: 1 } }, { new: true })
        .then((updatedDay) => {
          res.status(204).json(updatedDay);
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
