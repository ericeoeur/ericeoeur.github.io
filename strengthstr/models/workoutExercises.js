const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const workoutExercisesSchema = Schema({
  exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'oneExercise'}]
  user: {
    required: true, 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  } 
}, {
  timestamps: true
}); 

const workoutExercises = mongoose.model('workoutExercises', workoutExercisesSchema);

module.exports = workoutExercises; 