const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', { 
    currentUser: req.session.currentUser })
})

// on sessions form submit (log in)
sessions.post('/', (req, res) => {
 console.log('you have logged in');
  // Step 1 Look for the username
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err)
      res.send('There was a DB problem.')
    } else if (!foundUser) {
      res.send('<a  href="/">Sorry, no user found </a>')
    } else {
      // check passwords are matching
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        // add the user to our session
        req.session.currentUser = foundUser
        res.redirect('/')
      } else {
        res.send('<a href="/"> password does not match </a>')
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions