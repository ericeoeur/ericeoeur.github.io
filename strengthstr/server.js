// == DEPENDENCIES == // 
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const session = require('express-session');
const bodyParser = require('body-parser');

//import and configure dotenv
require('dotenv').config();

// == CONFIGURATIONS == // 
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT;
const DBNAME = process.env.DBNAME;

//controller Logic
const sessionsController = require('./controllers/sessions_controller.js')
const userController = require('./controllers/users_controller.js')
const oneExerciseController = require('./controllers/oneExercise_controller.js')


// == MIDDLEWARE == //
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

app.use(
  session({
    secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
  })
)

// == CONTROLLERS == // 
app.use('/sessions', sessionsController)
app.use('/users', userController)
app.use('/oneexercise', oneExerciseController)

// == DATABASE == //
mongoose.connect(`mongodb://localhost:27017/${DBNAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

//What we wnat to do with the connection itself 
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB!');
})

// Connection Error/Success Define callback functions for various events
db.on('error', err => console.log(err.message + ' is mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// == MODELS == // 
const User = require('./models/users.js');
const OneRepMax = require('./models/oneRepMax.js');
//const bodyParser = require('body-parser');
const OneExercise = require('./models/oneExercise.js');
//const workout = require('./models/workoutExercises.js'); 

// == ROUTES == // 
app.get('/', isAuthenticated, (req, res) => {
  if (req.session) {
    OneRepMax.find({
      'user': req.session.currentUser._id
    }, (error, OneRepMaxes) => {
      res.render('index.ejs', {
        currentUser: req.session.currentUser,
        OneRepMaxes: OneRepMaxes
      })
    });
  } else {
    res.render('/users/new');
  }
})

app.get('/create-session', (req, res) => {
  console.log("~~~~CREATE SESSION~~~~~~")
  console.log(req.session);
  req.session.anyProperty = 'some poop'; //this is the password
  console.log(req.session);
  res.redirect('/');
});

app.get('/retrieve-session', (req, res) => {
  console.log("~~~~RETRIEVE SESSION~~~~~~")
  if (req.session.anyProperty === 'some value') { //this is checking if it matches from the create session anyProperty
    console.log("the session properties match");
  } else {
    console.log('session properties do not match');
  }
  res.redirect('/');
})

app.get('/update-session', (req, res) => {
  req.session.anyProperty = 'some value';
  console.log("~~~~UPDATE SESSION~~~~~~")
  console.log(req.session);
  res.redirect('/');
})

app.get('/destroy-session', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("we could not destroy session")
    } else {
      console.log("WE DESTROYED THE SESSION")
    }
  });
  res.redirect('/');
})

const hashedString = bcrypt.hashSync('yourStringHere', bcrypt.genSaltSync(10))
bcrypt.compareSync('yourGuessHere', hashedString) //returns true or false

// == LISTENER == // 
app.listen(PORT, () => {
  console.log("StrengthStr is listening on port " + PORT);
})