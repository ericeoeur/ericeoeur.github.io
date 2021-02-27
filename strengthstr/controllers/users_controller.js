const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

users.get('/new', (req, res) => {
  res.render('users/new.ejs', {
  currentUser: req.session.currentUser
})
})

users.post('/', (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  console.log("~~~~");
  console.log(req.body);

  let newUser = new User(req.body); 
  newUser.save((err, newUser) => {
    if (err) {
      console.log(err);
      res.status(400).send("There is an error while adding a new user"); 
    }else { 
      res.status(200).json(newUser);
    }
  })
})

module.exports = users