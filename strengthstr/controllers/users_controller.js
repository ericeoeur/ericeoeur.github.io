const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')
const OneRepMax = require('../models/oneRepMax');


// == ROUTES == // 

// == CREATE - ROUTE TO NEW USER CREATION PAGE == // 
users.get('/new', (req, res) => {
  res.render('users/new.ejs', {
    currentUser: req.session.currentUser
  })
})

// == CREATE - USER CREATION POST ROUTE == // 
users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
   //The above statement overwrites the user password a hashed or "salted" password


 // USER CREATION - USERS.JS MODEL
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
    }
  })

// ONE REP MAXES - ONEREPMAX.JS MODEL 
  let squatOneRepMax = OneRepMax({
    liftName: 'Squat',
    weight: req.body.oneRepMaxSquat,
    user: newUser
  });

  let benchOneRepMax = OneRepMax({
    liftName: 'Bench',
    weight: req.body.oneRepMaxBench,
    user: newUser
  });

  let pressOneRepMax = OneRepMax({
    liftName: 'Press',
    weight: req.body.oneRepMaxPress,
    user: newUser
  });

  let deadliftOneRepMax = OneRepMax({
    liftName: 'Deadlift',
    weight: req.body.oneRepMaxDeadlift,
    user: newUser
  });

// COMBINE ONE REP MAXES ARRAY INTO USER - SAVE AND PROMISE AND RESAVE NEW USER 
  Promise.all([
    squatOneRepMax.save(),
    benchOneRepMax.save(),
    pressOneRepMax.save(),
    deadliftOneRepMax.save()
  ]).then(function (savedOneRepMaxes) {
    newUser.oneRepMaxes = savedOneRepMaxes;
    newUser.save();
    res.redirect('/');
  }).catch(function (err) {
    console.log("ERROR SAVING ONE REP MAXES");
    console.log(err);
  });

// HOW TO SAVE ONE REP MAXES TO USER WITHOUT A PROMISE 
  //   squatOneRepMax.save((err,squatOneRepMax) => {
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
  //     // User.findOne({_id: currentUser._id }).populate('oneRepMaxes').
  //     // exec(function (err, user) {
  //     //   console.log(user.oneRepMaxes[0].liftName)
  //     // }); 
  //     res.redirect('/');
  //   }
  // })
})

module.exports = users