const express = require('express');
const OneExercise = require('../models/oneExercise.js');
const User = require('../models/users.js')
const OneRepMax = require('../models/oneRepMax');
const WorkoutExercises = require('../models/workoutExercises.js');
const {
  update
} = require('../models/users.js');
const lift = express.Router();

// == AUTHTENTICATION CHECK == // 
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

// == SeeD ROUTE == // 
lift.get('/seed', (req, res) => {
  OneExercise.create(
    [{
        liftName: 'Squat',
        weight: '135',
        sets: '3',
        reps: '5',
        completed: false
      },
      {
        liftName: 'Bench',
        weight: '95',
        sets: '3',
        reps: '5',
        completed: false
      },
      {
        liftName: 'Press',
        weight: '75',
        sets: '3',
        reps: '5',
        completed: false
      },
      {
        liftName: 'Deadlift',
        weight: '175',
        sets: '1',
        reps: '5',
        completed: true
      }
    ],
    (error, data) => {
      console.log("oneExercise Seed was successful");
      res.redirect('/')
    }
  )
})

// == NEW EXERCISE == // 
lift.get('/new', isAuthenticated, (req, res) => {
  res.render('../views/exercises/new.ejs', {
    currentUser: req.session.currentUser
  })
})

// == EDIT EXERCISE == // 
lift.get('/:workoutId/:id/edit', (req, res) => {
  OneExercise.findById(req.params.id, (error, showLift) => {
    console.log(req.params);
    res.render('../views/exercises/editOneExercise.ejs', {
      currentUser: req.session.currentUser,
      lift: showLift,
      workoutID: req.params.workoutId
    })
  });
});

// == UPDATE EDITED EXERCISE == // 
lift.put('/:workoutId/:id', (req, res) => {
  if (req.body.completed === 'on') {
    req.body.completed = true
  } else {
    req.body.completed = false
  }

  OneExercise.findByIdAndUpdate(req.params.id, req.body, (error, updatedLift) => {
    res.redirect('/oneexercise/' + req.params.workoutId + '/' + req.params.id + '/edit');
  });
});

// === UPDATE EXERCISE - SET COMPLETED (BUTTON) === //
lift.put('/:workoutId/:id/true/', (req, res) => {
  req.body.completed = true
  OneExercise.findByIdAndUpdate(req.params.id, req.body, (error, updatedLift) => {
    res.redirect('/oneexercise/' + req.params.workoutId + '/' + req.params.id + '/edit');
  });
});

// === UPDATE EXERCISE- SET FAILED (BUTTON)=== //
lift.put('/:workoutId/:id/false/', (req, res) => {
  req.body.completed = false
  OneExercise.findByIdAndUpdate(req.params.id, req.body, (error, updatedLift) => {
    res.redirect('/oneexercise/' + req.params.workoutId + '/' + req.params.id + '/edit');
  });
});

// === DELETE EXERCISE === //
lift.delete('/:workoutId/:id', (req, res) => {
  OneExercise.findByIdAndRemove(req.params.id, (error, deletedExercise) => {
    res.redirect('/workout/' + req.params.workoutId)
  })
})

// === CREATE NEW EXERCISE === //
lift.post('/', (req, res) => {
  req.body.completed = null;

//Create the new Lift/oneExercise using the OneExercise Model 
  let newLift = new OneExercise({
    liftName: req.body.liftName,
    weight: req.body.weight,
    sets: req.body.sets,
    reps: req.body.reps,
    completed: req.body.completed
  })

  //Push this new lift into the WorkoutExercises Schema Array for Exercises. This is where all the oneExercises are held.
  WorkoutExercises.findById(req.body.workoutID, (error, foundWorkout) => {
    newLift.save((err, newLift) => {
      if (err) {
        res.status(400).send("There is an error while adding a new lift");
      } else {
        console.log("Successfully added a new lift!");
        foundWorkout.exercises.push(newLift);
        foundWorkout.save();
        res.redirect('/workout/' + req.body.workoutID);
      }
    })
  })
})

module.exports = lift