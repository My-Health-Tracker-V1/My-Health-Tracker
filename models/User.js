const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: {
    type:String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  days: [{ type: Schema.Types.ObjectId, ref: 'Day'}],
  recipes: [{
    recipeName: String,
    servings: Number,
    ingredients: [{
      name: String,
      quantity: Number,
      unit: String
    }]
  }]
},

{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
