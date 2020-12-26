const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  days: [{ type: Schema.Types.ObjectId, ref: 'Day'}],
  googleID: String,
  // days: [{ type: Schema.Types.ObjectId, ref: 'Day', default:null}],
  // need to check with Hortencia
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
