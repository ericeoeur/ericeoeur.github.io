
# Project 2: StrengthStr
![StrengthStr Logo](https://github.com/ericeoeur/ericeoeur.github.io/blob/main/strengthstr/public/img/ss_barbell_mono.png)
## Overview

As a casual powerlifter, I oftentimes find myself using an old composition book to track my progress and lifts. While it has been helpful over the past few years, sometimes I have a hard time reading what I have written, making it difficult for me to figure out what my next workout should look like. I created StrenghtStr as an easy-to-read and mobile-friendly tool to create, track, modify, and generate workouts based off a person's one rep maxes of the four major barbell lifts: squat, bench, overhead press, and deadlift. This project was created for General Assembly's SEI-119 Project 2. 

**Live Site:** https://strengthstr.herokuapp.com/

Upon entering StrengthStr, the user will be asked to create an account or login if an existing account is available. On the sign up page, the user will be prompted to create an account and enter their one rep maxes for bench, squat, deadlift, and overhead press.  After the user makes an account, you will be prompted to login, where you will see a dashboard containing the user's profile information. 

By clicking on either the image of the barbell or the "WORKOUTS" button, the user will enter the workouts page. At the top of the page, there will be two buttons: "Add Custom Workout" and "Generate Workout". 

**Add Custom Workout**
Upon clicking this link, the user will generate an empty workout ready to be filled with user-created lifts. The user can click on the generated workout to begin adding custom lifts to the selected workout. 

**Generate Workout**
This button will auto-generate a squat, bench, deadlift, and press workout based off the user's one rep maxes. The methodology behind these numbers is inspired by the Starting Strength lifting formula as well as the Jeff Nippard Powerbuilding series. In line with the concept of progressive overload, every time the user generates a workout, each lift will increment from the last generated workout. 

When users click on either their custom workout or generated workout, they have the ability to add lifts, edit lifts, and delete lifts as needed. 

When a user presses/clicks on a particular lift, a suggested warm-up schema will be generated followed by the working set. If the user has a successful lift for their working set, they may press/click "Completed Working Set"; if they were unable to complete the working set, they can press/click "Failed Working Set". This will toggle all instances of their particular lift to turn green (successful) or red (failed). This color scheme toggle is also reflected in the overall workouts page as well so that user can get an idea of their progress over time. 


## Technologies Used
  * Languages - HTML5, CSS3, Javascript, Node.js
  * Frameworks and Middleware: Express, Express-Session, Mongoose, EJS  
  * Database: MongoDB 
  * Design - Bulma, MaterialJS, FontAwesome, Google Fonts
  * Editor – Visual Studio Code 

## Features
  * Mobile-reponsive design 
  * User-minded color choices and design for ease of use
  * User profile creation with saved workout/lift data
  * Auto-generated workouts and warmups 
   
## Wireframing and Initial Design Concepts 
![Wireframe](https://github.com/ericeoeur/ericeoeur.github.io/blob/main/strengthstr/public/img/jeopardy_wireframing.jpg)

## Future Development
* Allow the user to enter a custom date for the workout
* Fix bugs in the "generate workout" feature. 
* Include a profile edit page
* Create a workout notes section per lift
* Build progress bars to showcase workouts over time. 
