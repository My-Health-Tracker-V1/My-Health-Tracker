const express = require("express");
const router = express.Router();

const Day = require("../models/Day");
const User = require("../models/User");

router.post("/user/:id/day/:date", (req, res, next) => {
  Day.findOne({ $and: [{ owner: req.params.id }, { date: req.params.date }] })
    .then((day) => {
      const newSymptom = {
        name: req.body.name,
        startTime: req.body.startTime,
        intensity: req.body.intensity,
        notes: req.body.notes,
      };

      if (day !== null) {
        Day.findByIdAndUpdate(
          day._id,
          { $push: { symptoms: newSymptom } },
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
          sleep: [],
          symptoms: [newSymptom],
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
      const filteredSymptom = day.symptoms.filter(
        (symptom) => symptom._id == req.body.data[0]
      );
      const index = day.symptoms.indexOf(filteredSymptom[0]);

      const symptomArr = [...day.symptoms];

      symptomArr[index].startTime = req.body.data[1].startTime;
      symptomArr[index].name = req.body.data[1].name;
      symptomArr[index].intensity = req.body.data[1].intensity;
      symptomArr[index].notes = req.body.data[1].notes;

      Day.findByIdAndUpdate(day._id, { symptoms: symptomArr }, { new: true })
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
        { $pull: { symptoms: { _id: req.query["0"] } } },
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
