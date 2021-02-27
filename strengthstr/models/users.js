const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  age: Number,
  height: Number, 
  weight: Number
  // oneRepMaxes: [
  //   {type: mongoose.Schema.Types.ObjectId, ref:'oneRepMax'}
  // ]
  // , 
  // workoutExercises: [
  //   {type: mongoose.Schema.Types.ObjectId, ref:'workoutExercises'}
  // ]
});

const User = mongoose.model('User', userSchema)

module.exports = User; 