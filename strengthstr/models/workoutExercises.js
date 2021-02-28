const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const workoutExercisesSchema = Schema({
  exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'OneExercise'}],
  user: {
    required: true, 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  } 
}, {
  timestamps: true
}); 

const WorkoutExercises = mongoose.model('WorkoutExercises', workoutExercisesSchema);

module.exports = WorkoutExercises; 