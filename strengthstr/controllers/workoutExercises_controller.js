const express = require('express'); 
const OneExercise = require('../models/oneExercise.js'); 
const User = require('../models/users.js')
const OneRepMax = require('../models/oneRepMax');
const WorkoutExercises = require('../models/workoutExercises.js');
const Workout = express.Router(); 



// add shit in here to take in the data from oneExercise and show them 

// ADD CUSTOM WORKOUT 
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
      console.log("An custom workoutExercise was created");
      res.redirect('/workoutExercises');
    }
  )
})


// GENERATE WORKOUT
Workout.get('/generateWorkout', (req, res) =>{
  console.log(req.session.currentUser); // you can see user data in here!
 


let generatedWorkout = new WorkoutExercises({
  exercises:[],
  user: req.session.currentUser
}); 

// generatedWorkout.save((err, generatedWorkout) => {
//   if (err) {
//     console.log(err);
//     res.status(400).send("There is an error while adding a generated workout"); 
//   } else {
//     console.log("Successully added generated workout!")
//   }
// })


User.findById(req.session.currentUser._id).populate('oneRepMaxes').
  exec(function (err, userData) {
    if (err) return handleError(err);
    console.log("These are the 1 rep maxes for the user"); 


    for (let i =0; i <userData.oneRepMaxes.length; i++){
    console.log(userData.oneRepMaxes[i].liftName);
    console.log(userData.oneRepMaxes[i].weight);
  }


let generatedSquat = OneExercise({
  liftName: userData.oneRepMaxes[0].liftName, 
  weight: userData.oneRepMaxes[0].weight,
  sets: '3',
  reps: '5',
  completed: null
}); 

let generatedBench = OneExercise({
  liftName: userData.oneRepMaxes[1].liftName, 
  weight: userData.oneRepMaxes[1].weight,
  sets: '3',
  reps: '5',
  completed: null
}); 

let generatedPress = OneExercise({
  liftName: userData.oneRepMaxes[2].liftName, 
  weight: userData.oneRepMaxes[2].weight,
  sets: '3',
  reps: '5',
  completed: null
}); 

let generatedDeadlift = OneExercise({
  liftName: userData.oneRepMaxes[3].liftName, 
  weight: userData.oneRepMaxes[3].weight,
  sets: '1',
  reps: '5',
  completed: null
}); 


Promise.all([
  generatedSquat.save(),
  generatedBench.save(), 
  generatedPress.save(),
  generatedDeadlift.save()
]).then(function(generatedExercises){
  generatedWorkout.exercises = generatedExercises;
  generatedWorkout.save(); 
  res.redirect('/workoutExercises'); 
}).catch(function(err) {
  console.log("Error saving generated workout");
  console.log(err); 
}); 

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


//braket colorizer 2 


// //CREATE
// Workout.post('/', (req,res) => {
//   if (req.body.completed === 'on') {
//     req.body.completed = true
//   } else {
//     req.body.completed = false
//   }

// //   console.log("~~~ New Lift Post ~~~~");
// //   console.log(req.body);
// // console.log(req.body);

//   let newLift = new OneExercise({
//     liftName: req.body.liftName, 
//     weight: req.body.weight, 
//     sets: req.body.sets, 
//     reps: req.body.reps, 
//     completed: req.body.completed
//   })

//   // WorkoutExercises.findById(req.params.id, (error, foundWorkout) => {



//   newLift.save((err, newLift) => {
//     if (err) {
//       res.status(400).send("There is an error while adding a new lift"); 
//     } else {
//       console.log("you have successfully added a new lift!"); 
//       console.log(req.params.id);
      



//     }
//   })
  
  //now you need to try to PUSH this data of newLift into the workoutExercises' exercise array. 



// })






//create a workout
//initaitally it will come with an empty exercises array
//after you create the workout it will automatically reroute you to the SHOW page of that particular's workout
//that show page will have a "ADD LIFT" button will use the oneExercise model, create a lift from that, and then push it to the empty exercises array



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