const express = require("express");
const router = express.Router();

const Day = require("../models/Day");
const User = require("../models/User");

router.post("/user/:id/day/:date", (req, res, next) => {
  Day.findOne({ $and: [{ owner: req.params.id }, { date: req.params.date }] })
    .then((day) => {
      const newSleep = {
        startTime: req.body.startTime,
        duration: req.body.duration,
        notes: req.body.notes,
      };

      if (day !== null) {
        Day.findByIdAndUpdate(
          day._id,
          { $push: { sleep: newSleep } },
          { new: true }
        )
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
          sleep: [newSleep],
          symptoms: [],
          energy: null,
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
      const filteredSleep = day.sleep.filter(
        (sleep) => sleep._id == req.body.data[0]
      );
      const index = day.sleep.indexOf(filteredSleep[0]);

      const sleepArr = [...day.sleep];

      sleepArr[index].startTime = req.body.data[1].startTime;
      sleepArr[index].notes = req.body.data[1].notes;
      sleepArr[index].duration = req.body.data[1].duration;

      Day.findByIdAndUpdate(day._id, { sleep: sleepArr }, { new: true })
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
      Day.findByIdAndUpdate(
        day._id,
        {
          $pull: {
            sleep: {
              startTime: req.body.startTime,
              duration: req.body.duration,
            },
          },
        },
        { new: true }
      )
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
