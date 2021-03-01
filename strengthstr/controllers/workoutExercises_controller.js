const express = require('express'); 
const OneExercise = require('../models/oneExercise.js'); 
const User = require('../models/users.js')
const OneRepMax = require('../models/oneRepMax');
const WorkoutExercises = require('../models/workoutExercises.js');
const Workout = express.Router(); 



// add shit in here to take in the data from oneExercise and show them 

Workout.get('/seed', (req, res) =>{
  console.log(req.session.currentUser._id); // you can see user data in here!
  WorkoutExercises.create(
    [
      {
        exercises: [],
        user: req.session.currentUser
      }
    ],
    (error, data) => {
      console.log("An workoutExercise was created");
      res.redirect('/');
    }
  )
})






// const workoutExercisesSchema = Schema({
//   exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'OneExercise'}],
//   user: {
//     required: true, 
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   } 
// }, {
//   timestamps: true
// }); 



module.exports = Workout;