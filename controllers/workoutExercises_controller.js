const express = require('express');
const OneExercise = require('../models/oneExercise.js');
const User = require('../models/users.js')
const OneRepMax = require('../models/oneRepMax');
const WorkoutExercises = require('../models/workoutExercises.js');
const Workout = express.Router();
let weightIncrement = 0;

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
Workout.get('/generateWorkout', (req, res) => {
  console.log(req.session.currentUser); // you can see user data in here!

  let generatedWorkout = new WorkoutExercises({
    exercises: [],
    user: req.session.currentUser
  });

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

    weightIncrement += 5;

  })
})

// SHOW
Workout.get('/:id', (req, res) => {
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

//create a workout
//initaitally it will come with an empty exercises array
//after you create the workout it will automatically reroute you to the SHOW page of that particular's workout
//that show page will have a "ADD LIFT" button will use the oneExercise model, create a lift from that, and then push it to the empty exercises array



module.exports = Workout;