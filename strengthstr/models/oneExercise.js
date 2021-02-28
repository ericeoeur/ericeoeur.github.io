const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const oneExerciseSchema = Schema({
  liftName: String, 
  weight: Number,
  sets: Number, 
  reps: Number, 
  completed: Boolean, 
}); 

const OneExercise = mongoose.model('OneExercise', oneExerciseSchema);

module.exports = oneExercise; 