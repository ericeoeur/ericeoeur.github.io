const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const oneExerciseSchema = Schema({
  liftName: String, 
  weight: Number,
  sets: Number, 
  reps: Number, 
  completed: Boolean, 
}); 

const oneExercise = mongoose.model('OneRepMax', oneExerciseSchema);

module.exports = oneExercise; 