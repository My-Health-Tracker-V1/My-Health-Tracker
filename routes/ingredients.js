const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const Day = require('../models/Day');
const User = require('../models/User');
const Ingredient = require('../models/Ingredient');

// get all the Ingredients
router.get('/', (req, res, next) => {
  Ingredient.find()
    .populate('owner')
    .then(ingredients => {
      res.status(200).json(ingredients);
    })
    .catch(err => {
      res.json(err);
    })
});

// Get a ingredient by Id
router.get('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Ingredient.findById(req.params.id)
    .populate('owner')
    .then(ingredient => {
      if (!ingredient) {
        console.log('no Ingredient');
        res.status(404).json(ingredient);
      } else {
        res.status(200).json(ingredient);
      }
    })
    .catch(err => {
      res.json(err);
    })
});


// router.get('/user/:id/day/:date/ingredients', (req, res) => {
//     Day.findOne({$and: [{owner: req.params.id}, {date: req.params.date}]})
//     .populate('owner')
//     .populate({
//       path: 'foods',
//       populate:{
//         path: 'ingredients',
//         model: 'Ingredient'
//       }
//     .then(day => {
//       res.status(200).json(day)
//     }).catch(err => {
//       res.json(err);
//     })
// })
// })

// LoggedIn user want to create a single food Ingredient
router.post('/user/:id/day/:date', (req, res) => {
  const { user, date, food} = req.body;
  const ingredients = food.ingredients.map(ing => {
    return {
      name: ing.name,
      brand: ing.brand,
      category: ing.category,
      servingAmount: ing.servingAmount,
      servingSize: ing.servingSize,
      owner: req.params.id
    }
  });
  // const owner = req.user._id;
  // Check if the user already has a day
console.log('this is req.params.id', req.params)
 Day.findOne({$and: [{owner: req.params.id}, {date: req.params.date}]})
  .then (day => {
    console.log('this is the day', day)
    if(day !== null) {
      Ingredient.create(ingredients)
      .then(dbIngredients => {
        console.log('these are the ingredients', dbIngredients)
        Day.findByIdAndUpdate(day._id,
          { $push: {"foods": 
            {startTime: food.startTime,
            name: food.name,
            portion: food.portion,
            eatenPortion: food.eatenPortion,
            imgUrl: "",
            ingredients: dbIngredients
        }}}, {new: true}).then(dbIngredients => {
          res.status(201).json(dbIngredients);
          // res.redirect('/add/Foods')
        })
        .catch(err => {
          res.json(err);
        })
      })
    } else {
      Ingredient.create(ingredients)
        .then((dbIngredients) => {
          console.log(dbIngredients);
          Day.create({
            date: date,
            owner: req.params.id,
            foods: [{startTime: food.startTime,
              name: food.name,
              portion: food.portion,
              eatenPortion: food.eatenPortion,
              imgUrl: "",
              ingredients: dbIngredients
          }],
            drinks:[],
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
          // res.redirect('/add/Foods')
        })
        .catch(err => {
          res.json(err);
        })
    }
  })
})

  // LoggedIn user want to create a drink Ingredient
router.post('/drinks/user/:id/day/:date', (req, res) => {
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

// add a recipe
router.post('/recipe/user/:id/day/:date', (req, res) => {
  const { recipeName, date, startTime, name, brand, category, servingAmount, servingSize, portion, eatenPortion } = req.body;
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
          { $push: {"foods": 
            {startTime: startTime,
            name: recipeName,
            portion: portion,
            eatenPortion: eatenPortion,
            imgUrl: "",
            ingredients: dbIngredient
        }}}, {new: true}).then(dbIngredient => {
          res.status(201).json(dbIngredient);
          // res.redirect('/add/Foods')
        })
        .catch(err => {
          res.json(err);
        })
      })
    } else {
      Ingredient.create({
        name: name,
        brand: brand,
        category: category,
        servingAmount: servingAmount,
        servingSize: servingSize,
        owner: req.params.id
      })
        .then((dbIngredient) => {
          Day.create({
            date: date,
            owner: req.params.id,
            foods: [{
              startTime: startTime,
              imgUrl: "",
              name: recipeName,
              portion: portion,
              eatenPortion: eatenPortion,
                // ingredients are obejcts
              ingredients: [dbIngredient]
            }],
            drinks:[],
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
          // res.redirect('/add/Foods')
        })
        .catch(err => {
          res.json(err);
        })
    }
  })
})

// update a Ingredient
// router.put('/:id', (req, res, next) => {
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }

//   const { name, brand , category } = req.body;
//   const owner = req.user._id;
//   Day.findByIdAndUpdate(req.params.id,{ 
//     name,
//     brand,
//     category,
//     owner 
//   },
//     { new: true }
//   )
//     .then(ingredient => {
//       console.log(ingredient);
//       res.status(200).json(ingredient);
//     })
//     .catch(err => {
//       res.json(err);
//     })
// });

router.delete('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Ingredient.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'ok' })
    })
    .catch(err => {
      res.json(err);
    })
});

// delete food

router.put('/user/:userId/day/:date/:foodId/delete', (req, res, next) => {
  console.log("delete params");
  console.log(req.params);
  Day.findOne({$and: [{owner: req.params.userId}, {date: req.params.date}]})
  .then(dbDay => {
    const newFoods = dbDay.foods.filter(food => 
      food.id !== req.params.foodId
    )
    console.log("this is the new foods array");
    console.log(newFoods);
    Day.findOneAndUpdate({$and: [{owner: req.params.userId}, {date: req.params.date}]},
      {foods: newFoods})
      .then(() => {
        res.status(200).json({ message: 'ok' })
      })
      .catch(err => {
        res.json(err);
      })
  })
})

// delete drink

router.put('/drinks/user/:userId/day/:date/:foodId/delete', (req, res, next) => {
  console.log("delete params");
  console.log(req.params);
  Day.findOne({$and: [{owner: req.params.userId}, {date: req.params.date}]})
  .then(dbDay => {
    const newDrinks = dbDay.drinks.filter(drink => 
      drink.id !== req.params.drinkId
    )
    console.log("this is the new foods array");
    console.log(newFoods);
    Day.findOneAndUpdate({$and: [{owner: req.params.userId}, {date: req.params.date}]},
      {drinks: newDrinks})
      .then(() => {
        res.status(200).json({ message: 'ok' })
      })
      .catch(err => {
        res.json(err);
      })
  })
})


// edit a food 

router.put('/user/:userId/day/:date/:foodId/edit', (req, res) => {
  const food = req.body.food;
 
  const ingredients = req.body.food.ingredients.map(ing => {
    return {
      name: ing.name,
      brand: ing.brand,
      category: ing.category,
      servingAmount: ing.servingAmount,
      servingSize: ing.servingSize,
      owner: req.params.id
    }
  });
  Ingredient.create(ingredients)
    .then(dbIngredients => {
      console.log('these are the ingredients', dbIngredients)
      Day.findOne({$and: [{owner: req.params.userId}, {date: req.params.date}]})
        .then(dbday => {
          console.log("db index", dbday.foods.map(f => f._id));
          
          const newFoods = dbday.foods;
          console.log("food id", req.params.foodId);
          const changedIdx = newFoods.findIndex(food => food._id == req.params.foodId);
          console.log("gefundener Index", changedIdx);
          newFoods[changedIdx].ingredients = dbIngredients.map(ing => ing._id);
          Day.findByIdAndUpdate(dbday._id, {foods: newFoods}, {new: true})
          .then(dbIngredients => {
          res.status(201).json(dbIngredients);
          res.redirect('/add/Foods')
          })
          .catch(err => {
            res.json(err);
          })
        })
        })
      
  })

module.exports = router;