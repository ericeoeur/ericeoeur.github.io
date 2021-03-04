const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

// == ROUTES == // 
// == CREATE - Route to a new user session == // 
sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', { 
    currentUser: req.session.currentUser })
})

// == LOGIN - POST ROUTE FOR LOGGING IN WITH PASSWORD VALIDATION == // 
sessions.post('/', (req, res) => {
 console.log('you have logged in');
  // Look for the name
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err)
      res.send('There was a DB problem.')
    } else if (!foundUser) {
      res.send('<a href="/">Sorry, no user found </a>')
    } else {
  // Password Check 
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
  // Add User to current session
        req.session.currentUser = foundUser
        res.redirect('/')
      } else {
        res.send('<a href="/"> Passwords do not match. </a>')
      }
    }
  })
})

// == LOG OUT -- DESTROY SESSION == // 
sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions