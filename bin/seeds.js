const mongoose = require("mongoose");
const Day = require("../models/Day");
const User = require("../models/User");

const DB_NAME = "food-health";

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [
  {
    username: "hortencia",
    email: "hortencia@gmail.com",
    password: "123456789",

    days: [
      {
        date: new Date(2018, 11, 24),

        foods: [
          {
            startTime: new Date(2018, 11, 24, 10, 33),
            name: "Lasagne",
            imgUrl: "",
            brand: "Edeka",
            ServingAmount: 1,
            ServingSize: "plate",
            // here not sure
            ingredients: [],
          },
        ],

        drinks: [
          {
            startTime: new Date(2018, 11, 24, 11, 33),
            name: "Orange Juice",
            imgUrl: "",
            brand: "Edeka",
            ServingAmount: 1,
            ServingSize: "plate",
            // here not sure
            ingredients: [],
          },
        ],

        supplements: [
          {
            startTime: new Date(2018, 11, 24, 11, 33),
            name: "Vitamin C",
            imgUrl: "",
            brand: "Edeka",
            ServingAmount: 1,
            ServingSize: "plate",
            // here not sure
            ingredients: [],
          },
        ],

        medications: [
          {
            startTime: new Date(2018, 11, 24, 12, 50),
            name: "Ibuprofen",
            imgUrl: String,
            brand: "Edeka",
            ServingAmount: 1,
            ServingSize: "pill",
            // here not sure
            ingredients: [],
          },
        ],

        exercises: [
          {
            name: "Yoga",
            startTime: new Date(2018, 11, 24, 10, 33),
            duration: 1,
            intensity: 2,
          },
          {
            name: "Jogging",
            startTime: new Date(2018, 11, 24, 12, 33),
            duration: 1,
            intensity: 2,
          },
        ],

        sleep: [
          {
            startTime: new Date(2018, 11, 24, 23, 33),
            duration: 8,
            notes: "was good",
          },
        ],

        symptoms: [
          {
            name: "Fever",
            startTime: new Date(2018, 11, 24, 12, 33),
            duration: 0.5,
            intensity: 5,
            notes: "It was painful",
          },
          {
            name: "Nausea",
            startTime: new Date(2018, 11, 24, 12, 33),
            duration: 0.7,
            intensity: 9,
            notes: "Maybe i am pregnant",
          },
        ],

        energy: 2,
      },
    ],
  },

  {
    username: "facundo",
    email: "facundo@gmail.com",
    password: "123456789",

    days: [
      {
        date: new Date(2018, 11, 25),

        foods: [
          {
            startTime: new Date(2018, 11, 25, 08, 20),
            name: "Lasagne",
            imgUrl: "",
            brand: "Edeka",
            ServingAmount: 1,
            ServingSize: "plate",
            // here not sure
            ingredients: [],
          },

          {
            startTime: new Date(2018, 11, 25, 10, 20),
            name: "Apple",
            imgUrl: "",
            brand: "Edeka",
            ServingAmount: 1,
            ServingSize: "plate",
            // here not sure
            ingredients: [],
          },
        ],

        drinks: [
          {
            startTime: new Date(2018, 11, 25, 11, 33),
            name: "Orange Juice",
            imgUrl: "",
            brand: "Edeka",
            ServingAmount: 5,
            ServingSize: "bottle",
            // here not sure
            ingredients: [],
          },
        ],

        supplements: [
          {
            startTime: new Date(2018, 11, 25, 20, 23),
            name: "Vitamin C",
            imgUrl: "",
            brand: "Edeka",
            ServingAmount: 1,
            ServingSize: "pill",
            // here not sure
            ingredients: [],
          },
        ],

        medications: [
          {
            startTime: new Date(2018, 11, 24, 12, 50),
            name: "Ibuprofen",
            imgUrl: String,
            brand: "Edeka",
            ServingAmount: 1,
            ServingSize: "pill",
            // here not sure
            ingredients: [],
          },
        ],

        exercises: [
          {
            name: "Yoga",
            startTime: new Date(2018, 11, 24, 10, 33),
            duration: 1,
            intensity: 2,
          },
          {
            name: "Jogging",
            startTime: new Date(2018, 11, 24, 12, 33),
            duration: 1,
            intensity: 2,
          },
        ],

        sleep: [
          {
            startTime: new Date(2018, 11, 24, 23, 33),
            duration: 8,
            notes: "was good",
          },
        ],

        symptoms: [
          {
            name: "Fever",
            startTime: new Date(2018, 11, 24, 12, 33),
            duration: 0.5,
            intensity: 5,
            notes: "It was painful",
          },
          {
            name: "Nausea",
            startTime: new Date(2018, 11, 24, 12, 33),
            duration: 0.7,
            intensity: 9,
            notes: "Maybe i am pregnant",
          },
        ],

        energy: 6,
      },
    ],
  },

  {
    username: "xiaomei",
    email: "xiaomei@gmail.com",
    password: "123456789",

    days: [
      {
        date: new Date(2018, 11, 24),

        foods: [
          {
            startTime: new Date(2018, 11, 28, 12, 33),
            name: "Pommes",
            imgUrl: "",
            brand: "Edeka",
            ServingAmount: 1,
            ServingSize: "plate",
            // here not sure
            ingredients: [],
          },
        ],

        drinks: [
          {
            startTime: new Date(2018, 11, 28, 09, 33),
            name: "Apple Juice",
            imgUrl: "",
            brand: "Edeka",
            ServingAmount: 1,
            ServingSize: "plate",
            // here not sure
            ingredients: [],
          },
        ],

        supplements: [
          {
            startTime: new Date(2018, 11, 29, 11, 33),
            name: "Vitamin D",
            imgUrl: "",
            brand: "Edeka",
            ServingAmount: 1,
            ServingSize: "plate",
            // here not sure
            ingredients: [],
          },
        ],

        medications: [
          {
            startTime: new Date(2018, 11, 24, 12, 50),
            name: "Ibuprofen",
            imgUrl: String,
            brand: "Edeka",
            ServingAmount: 1,
            ServingSize: "plate",
            // here not sure
            ingredients: [],
          },
        ],

        exercises: [
          {
            name: "Tennis",
            startTime: new Date(2018, 11, 24, 10, 33),
            duration: 1,
            intensity: 2,
          },
          {
            name: "Jogging",
            startTime: new Date(2018, 11, 24, 12, 33),
            duration: 1,
            intensity: 2,
          },
        ],

        sleep: [
          {
            startTime: new Date(2018, 11, 24, 23, 33),
            duration: 8,
            notes: "was good",
          },
        ],

        symptoms: [
          {
            name: "Fever",
            startTime: new Date(2018, 11, 24, 12, 33),
            duration: 0.5,
            intensity: 5,
            notes: "It was painful",
          },
          {
            name: "Nausea",
            startTime: new Date(2018, 11, 24, 12, 33),
            duration: 0.7,
            intensity: 9,
            notes: "Maybe i am pregnant",
          },
        ],

        energy: 9,
      },
    ],
  },

  {
    username: "Timmy",
    email: "timmy@gmail.com",
    password: "123456789",

    days: [
      {
        date: new Date(2018, 09, 26),

        foods: [
          {
            startTime: new Date(2018, 09, 26, 10, 33),
            name: "Salat",
            imgUrl: "",
            brand: "Edeka",
            ServingAmount: 1,
            ServingSize: "plate",
            // here not sure
            ingredients: [],
          },
        ],

        drinks: [
          {
            startTime: new Date(2018, 09, 26, 11, 33),
            name: "Gin Tonic",
            imgUrl: "",
            brand: "Edeka",
            ServingAmount: 1,
            ServingSize: "glas",
            // here not sure
            ingredients: [],
          },
        ],

        supplements: [
          {
            startTime: new Date(2018, 09, 26, 12, 33),
            name: "Vitamin E",
            imgUrl: "",
            brand: "Edeka",
            ServingAmount: 1,
            ServingSize: "pill",
            // here not sure
            ingredients: [],
          },
        ],

        medications: [
          {
            startTime: new Date(2018, 09, 26, 12, 50),
            name: "Ibuprofen",
            imgUrl: String,
            brand: "Edeka",
            ServingAmount: 1,
            ServingSize: "pill",
            // here not sure
            ingredients: [],
          },
        ],

        exercises: [
          {
            name: "Yoga",
            startTime: new Date(2018, 11, 24, 10, 33),
            duration: 1,
            intensity: 2,
          },
          {
            name: "Jogging",
            startTime: new Date(2018, 11, 24, 12, 33),
            duration: 1,
            intensity: 2,
          },
        ],

        sleep: [
          {
            startTime: new Date(2018, 11, 24, 23, 33),
            duration: 8,
            notes: "was good",
          },
        ],

        symptoms: [
          {
            name: "Fever",
            startTime: new Date(2018, 11, 24, 12, 33),
            duration: 0.5,
            intensity: 5,
            notes: "It was painful",
          },
          {
            name: "Nausea",
            startTime: new Date(2018, 11, 24, 12, 33),
            duration: 0.7,
            intensity: 9,
            notes: "Maybe i am pregnant",
          },
        ],

        energy: 6,
      },
    ],
  },
];

async function daysLoop(day) {
  return new Promise((resolve, reject) => {
    Day.create(day).then((dbDay) => {
      resolve(dbDay._id);
    });
  });
}

users.forEach(async (user) => {
  for (let i = 0; i < user.days.length; i++) {
    user.days[i] = await daysLoop(user.days[i]);
  }
  await User.create(user);
});
