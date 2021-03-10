const express = require('express');
const OneExercise = require('../models/oneExercise.js');
const User = require('../models/users.js')
const OneRepMax = require('../models/oneRepMax');
const WorkoutExercises = require('../models/workoutExercises.js');
const Workout = express.Router();
let weightIncrement = 0; 

// == AUTHTENTICATION CHECK == // 
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

// ADD CUSTOM WORKOUT 
Workout.get('/seed', (req, res) => {
  console.log(req.session.currentUser._id); // you can see user data in here!
  WorkoutExercises.create(
    [{
      exercises: [],
      user: req.session.currentUser
    }],
    (error, data) => {
      console.log("An custom workoutExercise was created");
      res.redirect('/workoutExercises');
    }
  )
})

// GENERATE WORKOUT
Workout.get('/generateWorkout',  (req, res) => {
  console.log(req.session.currentUser); // you can see user data in here!

  //Generate the workout with an empty exercise array
  let generatedWorkout = new WorkoutExercises({
    exercises: [],
    user: req.session.currentUser
  });

    //Grab oneRepMaxes from user data and fill out all generated lifts using custom workout formula
  User.findById(req.session.currentUser._id).populate('oneRepMaxes').
  exec(function (err, userData) {
    if (err) return handleError(err);
    console.log("These are the 1 rep maxes for the user");

    for (let i = 0; i < userData.oneRepMaxes.length; i++) {
      console.log(userData.oneRepMaxes[i].liftName);
      console.log(userData.oneRepMaxes[i].weight);
    }

  

    let generatedSquat = OneExercise({
      liftName: userData.oneRepMaxes[0].liftName,
      weight: (Math.floor(((userData.oneRepMaxes[0].weight / 100) * 75) / 5) * 5) + weightIncrement, //75% RM      
      sets: '3',
      reps: '5',
      completed: null
    });

    let generatedBench = OneExercise({
      liftName: userData.oneRepMaxes[1].liftName,
      weight: (Math.floor(((userData.oneRepMaxes[1].weight / 100) * 65) / 5) * 5) + weightIncrement, //65% RM
      sets: '3',
      reps: '8',
      completed: null
    });

    let generatedPress = OneExercise({
      liftName: userData.oneRepMaxes[2].liftName,
      weight: (Math.floor(((userData.oneRepMaxes[2].weight / 100) * 70) / 5) * 5) + weightIncrement, //70% RM
      sets: '3',
      reps: '8',
      completed: null
    });

    let generatedDeadlift = OneExercise({
      liftName: userData.oneRepMaxes[3].liftName,
      weight: (Math.floor(((userData.oneRepMaxes[3].weight / 100) * 80) / 5) * 5) + weightIncrement, //80% RM
      sets: '1',
      reps: '5',
      completed: null
    });

    


//PROMISE - set promise to save all generated lifts and then add it to the user's workout exercises
    Promise.all([
      generatedSquat.save(),
      generatedBench.save(),
      generatedPress.save(),
      generatedDeadlift.save()
    ]).then(function (generatedExercises) {
      generatedWorkout.exercises = generatedExercises;
      generatedWorkout.save();
      res.redirect('/workoutExercises');
    }).catch(function (err) {
      console.log("Error saving generated workout");
      console.log(err);
    });

    //Increment the weight by five pounds each time
    weightIncrement += 5;

  })
})

// SHOW
Workout.get('/:id', isAuthenticated, (req, res) => {
  WorkoutExercises.findById(req.params.id).populate('exercises').
  exec(function (err, foundWorkout) {
    if (err) return handleError(err);
    res.render('../views/exercises/show.ejs', {
      currentUser: req.session.currentUser,
      Workout: foundWorkout,
    })
  })

});

//DELETE 
Workout.delete('/:id', (req, res) => {
  WorkoutExercises.findByIdAndRemove(req.params.id, (error, deletedWorkout) => {
    res.redirect('/workoutExercises');
  })
})

module.exports = Workout;