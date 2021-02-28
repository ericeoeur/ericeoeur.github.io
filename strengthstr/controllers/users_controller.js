const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')
const OneRepMax = require('../models/oneRepMax');

users.get('/new', (req, res) => {
  res.render('users/new.ejs', {
  currentUser: req.session.currentUser  
})
})

//Sign UP 
users.post('/', (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  console.log("~~~~");
  console.log(req.body);

  // let newUser = new User(req.body);
  let newUser = new User({
  username: req.body.username,
  password: req.body.password,
  age: req.body.age,
  height: req.body.height,
  weight: req.body.weight,
  });

  newUser.save((err, newUser) => {
    if (err) {
      console.log(err);
      res.status(400).send("There is an error while adding a new user"); 
    } else { 
      console.log("Successfully added user info!")
      //res.status(200).json(newUser);
    }
  })

  let squatOneRepMax = OneRepMax({
    //_id: newUser._id, 
    liftName: 'Squat', 
    weight: req.body.oneRepMaxSquat,
    user: newUser
  }); 
  //console.log(squatOneRepMax);

  let benchOneRepMax = OneRepMax({
    //_id: newUser._id, 
    liftName: 'Bench', 
    weight: req.body.oneRepMaxBench,
    user: newUser
  }); 

  let pressOneRepMax = OneRepMax({
    //_id: newUser._id, 
    liftName: 'Press', 
    weight: req.body.oneRepMaxPress,
    user: newUser
  }); 

  let deadliftOneRepMax = OneRepMax({
    //_id: newUser._id, 
    liftName: 'Deadlift', 
    weight: req.body.oneRepMaxDeadlift,
    user: newUser
  }); 

  Promise.all([
    squatOneRepMax.save(), 
    benchOneRepMax.save(), 
    pressOneRepMax.save(), 
    deadliftOneRepMax.save()
  ]).then(function(savedOneRepMaxes) {
    newUser.oneRepMaxes = savedOneRepMaxes;
    newUser.save(); 
    res.redirect('/');
  }).catch(function(err) {
    console.log("ERROR SAVING ONE REP MAXES"); 
    console.log(err); 
  });

    // squatOneRepMax.save((err,squatOneRepMax) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(400).send("There is an error while adding a new user"); 
  //   } else { 
  //     console.log("Successfully added squat info!")
  //     newUser.oneRepMaxes.push(squatOneRepMax);
  //     newUser.save(); 
  //     //res.status(200).json(squatOneRepMax);
  //     console.log("~~~~~");
  //     //Console the stuff within the one rep max
      // User.findOne({_id: currentUser._id }).populate('oneRepMaxes').
      // exec(function (err, user) {
      //   console.log(user.oneRepMaxes[0].liftName)
      // }); 
  //   }
  // })
})


module.exports = users

//  User.findOne({_id: currentUser._id }).populate('oneRepMaxes').
//       exec(function (err, user) {
//         console.log(user.oneRepMaxes[0].liftName)
//       }); 