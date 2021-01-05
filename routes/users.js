const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

router.get("/", (req, res, next) => {
  User.find()
    .populate("days")
    .populate({
      path: "foods",
      populate: {
        path: "ingredients",
        model: "Ingredient",
      },
    })
    .then((users) => {
<<<<<<< HEAD
=======
      console.log(users);
>>>>>>> master
      res.status(200).json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(req.params.id)
    .populate("days")
    .populate({
      path: "foods",
      populate: {
        path: "ingredients",
        model: "Ingredient",
      },
    })
    .then((user) => {
<<<<<<< HEAD
      if (!user) {
=======
      console.log("this is the response", user);
      if (!user) {
        console.log("no User");
>>>>>>> master
        res.status(404).json(user);
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const newEmail = req.body.data[0];
  const newPassword = req.body.data[1];

  let update;

  if (newPassword) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(newPassword, salt);

    if (!newEmail) {
      update = { password: hash };
    } else {
      update = { email: newEmail, password: hash };
    }
  } else {
    if (newEmail) {
      update = { email: newEmail };
    } else {
      return;
    }
  }

  User.findByIdAndUpdate(req.params.id, update, { new: true })
    .then(() => {
<<<<<<< HEAD
      res.json({ message: `Your profile was successfully updated!` });
    })
    .catch((err) => {
      res.json({ errorMessage: err.message });
=======
      res.json({
        message: `User profile with ${req.params.id} was successfully updated.`,
      });
    })
    .catch((err) => {
      res.json(err);
>>>>>>> master
    });
});

router.delete("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res
        .status(200)
<<<<<<< HEAD
        .json({ message: `${req.params.id} is removed successfully.` });
=======
        .json({
          message: `Project with ${req.params.id} is removed successfully.`,
        });
>>>>>>> master
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
