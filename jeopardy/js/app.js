let modalWrap = null;
let score = 0;
let timer; 

////////////////////////////////// REFERENCES ////////////////////////////////////
// Bootstrap 5: https://getbootstrap.com/docs/5.0/getting-started/introduction/ // 
// Modal Production in Boostrap 5: https://www.youtube.com/watch?v=lczv0v7DnYI  //
// Resetting a window: https://www.w3schools.com/jsref/met_win_clearinterval.asp//
// hiding divs: https://www.w3schools.com/jquery/jquery_hide_show.asp     
// CSS Tricks: Learned from CSS-TRICKS: https://css-tricks.com/snippets/css/scale-on-hover-with-webkit-transition/                                           //
//////////////////////////////////////////////////////////////////////////////////


///////////////// ARRAY AND FUNCTIONS THAT BUILD THE GAME'S BOARD AND VISUALS ///////////////////

// Jeopardy Game Questions and Answers in an array of objects. 
const gameCategories = {
  category1: [{
      categoryName: 'Famous POCs'
    }, {
      costQuestionAnswer: [{
        cost: 200,
        question: "This minister and Civil Rights Activist was born on January 15, 1929.",
        answers: ["Dalai Lama", "Martin Luther King Jr.", "Frances Scott Key", "Malcolm X"],
        correctAnswer: "Martin Luther King Jr."
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 400,
        question: "This singer is known for hits such as 'Single Ladies' and 'Irreplaceable'",
        answers: ["Beyoncé", "Aaliyah", "Jhene Aiko", "Sade"],
        correctAnswer: "Beyoncé"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 600,
        question: "Famous for movies such as 'Drunken Master' and 'Rumble in the Bronx'",
        answers: ["Bruce Lee", "Diego Luna", "Ken Wantanabe", "Jackie Chan"],
        correctAnswer: "Jackie Chan"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 800,
        question: "'Kiss from a Rose' was his popular hit in 1994.'",
        answers: ["Coolio", "La Bouche", "Seal", "Brian McKnight"],
        correctAnswer: "Seal"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 1000,
        question: "Author of 'The Next American Revolution' this Detroit-based Chinese-American social activist passed away in 2015.",
        answers: ["Grace Lee Boggs", "Yuri Kochiyama", "Erika Lee", "Wei-Han Huang"],
        correctAnswer: "Grace Lee Boggs"
      }],
    }
  ], //end of Category 1 

  category2: [{
      categoryName: 'Steven Universe'
    }, {
      costQuestionAnswer: [{
        cost: 200,
        question: "Used to protect his loved ones, Steven's weapon is a pink this ",
        answers: ["Shield", "Sword", "Mace", "Trident"],
        correctAnswer: "Shield"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 400,
        question: "The name of the city where the Crystal Gems reside",
        answers: ["Port City", "Ocean Town", "Emeryville", "Beach City"],
        correctAnswer: "Beach City"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 600,
        question: "When Pearl and Amethyst fuse, they form this:",
        answers: ["Sugilite", "Zoicite", "Opal", "Obsidian"],
        correctAnswer: "Opal"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 800,
        question: "This creator of Steven Universe is also known for their work on Cartoon Network's 'Adventure Time'",
        answers: ["Nancy Cartwright", "Rebecca Sugar", "DeeDee Magno Hall", "Ian Jones-Quarterly"],
        correctAnswer: "Rebecca Sugar"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 1000,
        question: "Garnet's voice actress is this singer known for her hit song 'American Boy'",
        answers: ["Kate Nash", "Lily Allen", "Solange", "Estelle"],
        correctAnswer: "Estelle"
      }],
    }
  ], //end of Category 2 

  category3: [{
      categoryName: '00s Music'
    }, {
      costQuestionAnswer: [{
        cost: 200,
        question: "Often spelling her name in music, this 'London Bridge' singer is also a member of the Black Eye Peas",
        answers: ["Fergie", "Derpy", "JLO", "Conor Oberst"],
        correctAnswer: "Fergie"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 400,
        question: "Known for the album 'Transatlanticism' this indie band's lead singer also created the band 'The Postal Service'",
        answers: ["Jared Leto", "Anthony White", "Ben Gibbard", "Dustin Krenshue"],
        correctAnswer: "Ben Gibbard"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 600,
        question: "The film Shrek featured this artist's hit song 'Cigarettes and Chocolate Milk'",
        answers: ["Lily Allen", "The Shins", "Feist", "Rufus Wainwright"],
        correctAnswer: "Rufus Wainwright"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 800,
        question: "This Russian-born American songwriter is famous for their songs 'Fidelity' and 'Samson'",
        answers: ["Andrew Bird", "Coco Rosie", "Regina Spektor", "Sufjan Stevens"],
        correctAnswer: "Regina Spektor"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 1000,
        question: "This artist began naming their albums after all 50 US states but only made two albums featuring 'Illinois' and 'Michigan'",
        answers: ["Mark Ronson", "Sufjan Stevens", "Elliot Smith", "Minus the Bear"],
        correctAnswer: "Sufjan Stevens"
      }],
    }
  ], //end of Category 3 

  category4: [{
      categoryName: 'Capitals'
    }, {
      costQuestionAnswer: [{
        cost: 200,
        question: "China",
        answers: ["Shanghai", "Beijing", "Guangzhou", "Hong Kong"],
        correctAnswer: "Beijing"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 400,
        question: "Mexico",
        answers: ["Mexico City", "Aguascalientes", "Oaxaca", "Guadalajara"],
        correctAnswer: "Mexico City"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 600,
        question: "Hungary",
        answers: ["Miskolc", "Szeged", "Pécs", "Budapest"],
        correctAnswer: "Budapest"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 800,
        question: "Cambodia",
        answers: ["Siem Reap", "Battambang", "Phnom Penh", "Sihanoukville"],
        correctAnswer: "Phnom Penh"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 1000,
        question: "Slovenia",
        answers: ["Ljubljana", "Bled", "Maribor", "Koper"],
        correctAnswer: "Ljubljana"
      }],
    }
  ], //end of Category 2 

  category5: [{
      categoryName: '90s Television'
    }, {
      costQuestionAnswer: [{
        cost: 200,
        question: "Recently rebooted, this animated series follows Yakko, Wakko, and their sister Dot.'",
        answers: ["South Park", "The Simpsons", "The Critic", "Animaniacs"],
        correctAnswer: "Animaniacs"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 400,
        question: "Moesha starred this famous R&B Singer",
        answers: ["Monica", "Brandy", "Lauryn Hill", "Janet Jackson"],
        correctAnswer: "Brandy"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 600,
        question: "Claire Danes and Jared Leto starred in this short-lived teenage drama on ABC",
        answers: ["Queer as Folk", "Step by Step", "Family Matters", "My So-Called Life"],
        correctAnswer: "My So-Called Life"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 800,
        question: "This show centered on four women and two men living in Prospect Heights, Brooklyn.",
        answers: ["Martin", "Living Single", "Sister Sister", "Family Matters"],
        correctAnswer: "Living Single"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 1000,
        question: "Helen Hunt and Paul Riser starred in this sitcom about a newly wed couple in New York",
        answers: ["Mad About You", "Caroline in the City", "Spin City", "Coach"],
        correctAnswer: "Mad About You"
      }],
    }
  ], //end of Category 5 

  category6: [{
      categoryName: 'Final Fantasy'
    }, {
      costQuestionAnswer: [{
        cost: 200,
        question: "Cloud, Tifa, Aeris, Barret, Sephiroth",
        answers: ["Final Fantasy 3", "Final Fantasy 8", "Final Fantasy 9", "Final Fantasy 7"],
        correctAnswer: "Final Fantasy 7"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 400,
        question: "Zidane, Garnet, Eiko, Vivi",
        answers: ["Final Fantasy 9", "Final Fantasy 2", "Final Fantasy 13", "Final Fantasy 3"],
        correctAnswer: "Final Fantasy 9"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 600,
        question: "Celes, Locke, Terra, Mog",
        answers: ["Final Fantasy 6", "Final Fantasy 8", "Final Fantasy 10", "Final Fantasy 12"],
        correctAnswer: "Final Fantasy 6"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 800,
        question: "Squall, Rinoa, Selphie, Quistis",
        answers: ["Final Fantasy 2", "Final Fantasy 8", "Final Fantasy 15", "Final Fantasy 5"],
        correctAnswer: "Final Fantasy 8"
      }],
    },
    {
      costQuestionAnswer: [{
        cost: 1000,
        question: "Rydia, Cecil, Edward, Golbez",
        answers: ["Final Fantasy 16", "Final Fantasy 13", "Final Fantasy 4", "Final Fantasy"],
        correctAnswer: "Final Fantasy 4"
      }],
    }
  ], //end of Category 6 
}; 

// Countdown Function for Game
const countDown = () => {
  $('.counter').each(function () {
    let count = parseInt($('.counter').html());
    if (count !== 0) {
      count--;
      $('.counter').html(count);
    } else if (count === 0) {
      clearInterval(timer);
      endGame();
    }
  });
}

// Populate the jeopardy game board with questions from the object array "game categories"
const createGameBoard = () => {
  //loop over all categories 
  for (let categories in gameCategories) {
    let $categories = gameCategories[categories][0].categoryName; //print all names from the array
    let $questionCost200 = gameCategories[categories][1].costQuestionAnswer[0].cost;
    let $questionCost400 = gameCategories[categories][2].costQuestionAnswer[0].cost;
    let $questionCost600 = gameCategories[categories][3].costQuestionAnswer[0].cost;
    let $questionCost800 = gameCategories[categories][4].costQuestionAnswer[0].cost;
    let $questionCost1000 = gameCategories[categories][5].costQuestionAnswer[0].cost;

    // Dynamically adding questions and answers via jquery
    const $boardColumns = $(` <div class="col-sm-2 category1">
  <div class="row">
  <h4 class="category-name">${ $categories }</h4>
  </div>
  <div class="row">
    <div class="col-sm-12 cost">
      <h5 class="price ${categories}" id="1"> $${ $questionCost200 }</h5>
    </div>      
  </div>  
  <div class="row">
    <div class="col-sm-12 cost">
      <h5 class="price ${categories}" id="2">$${ $questionCost400 }</h5>
    </div>      
  </div>
  <div class="row">
    <div class="col-sm-12 cost">
      <h5 class="price ${categories}" id="3">$${ $questionCost600 }</h5>
    </div>      
  </div>
  <div class="row">
    <div class="col-sm-12 cost">
      <h5 class="price ${categories}" id="4">$${ $questionCost800 }</h5>
    </div>      
  </div>
  <div class="row">
    <div class="col-sm-12 cost">
      <h5 class="price ${categories}" id="5">$${ $questionCost1000 }</h5>
    </div>      
  </div>      
  </div>`);
    $('.board').append($boardColumns);
  }
}

//Dynamically add questions to modal 
const addQuestions = (e) => {
  let $currentColumn = ($(e.currentTarget).children().attr('class').split(' ')[1]);
  let $currentQuestionNumber = ($(e.currentTarget).children().attr('id'));
  let $currentQuestion = (gameCategories[$currentColumn][$currentQuestionNumber].costQuestionAnswer[0].question);
  let $answerChoices = (gameCategories[$currentColumn][$currentQuestionNumber].costQuestionAnswer[0].answers);
  let $correctAnswer = (gameCategories[$currentColumn][$currentQuestionNumber].costQuestionAnswer[0].correctAnswer);

  const $answerButtons = ("<div class='row button-row'><div class='center'><div class='col-md-12'><button class='answer-button btn-outline-primary btn-lg col-md-12 text-center' id='button' data-name='" + $answerChoices[0] + "'> <div class='divider'/>" + $answerChoices[0] + "</button></div></div></div>" +

    "<div class='row button-row'><div class='center'><div class='col-md-12'><button class='answer-button btn-outline-primary btn-lg col-md-12 text-center' id='button' data-name='" + $answerChoices[1] + "'> <div class='divider'/>" + $answerChoices[1] + "</button></div></div></div>" +

    "<div class='row button-row'><div class='center'><div class='col-md-12'><button class='answer-button btn-outline-primary btn-lg col-md-12 text-center' id='button' data-name='" + $answerChoices[2] + "'> <div class='divider'/>" + $answerChoices[2] + "</button></div></div></div>" +

    "<div class='row button-row'><div class='center'><div class='col-md-12'><button class='answer-button btn-outline-primary btn-lg col-md-12 text-center' id='button' data-name='" + $answerChoices[3] + "'> <div class='divider'/>" + $answerChoices[3] + "</button></div></div></div>"
  );
  return $answerButtons;
}

// Modal Function that holds question, answer, and timer data. 
const showModal = (e) => {
  let $currentColumn = ($(e.currentTarget).children().attr('class').split(' ')[1]);
  let $currentQuestionNumber = ($(e.currentTarget).children().attr('id'));
  let $currentQuestion = (gameCategories[$currentColumn][$currentQuestionNumber].costQuestionAnswer[0].question);
  let $currentValue = (gameCategories[$currentColumn][$currentQuestionNumber].costQuestionAnswer[0].cost);
  let $answerChoices = (gameCategories[$currentColumn][$currentQuestionNumber].costQuestionAnswer[0].answers);
  let $correctAnswer = (gameCategories[$currentColumn][$currentQuestionNumber].costQuestionAnswer[0].correctAnswer);
  let $answerButtons = addQuestions(e);

  //Prevents Double Modals
  if (modalWrap !== null) {
    modalWrap.remove();
  }
  modalWrap = document.createElement('div');
  modalWrap.innerHTML = `<div class="modal fade" id="mainModal" data-backdrop="static" data-keyboard="false" href="#" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title show-price">$${ $currentValue }</h4>
       <h4 class="modal-title show-question">${ $currentQuestion }</h4>
        <button type="button" class="pass-button btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      ${ $answerButtons }
      </div>
      <div class="modal-footer">
      <h4 class= "timer"><span class="countdown"></span></h4>
        <button type="button" class="pass-button btn btn-danger" data-dismiss="modal">Pass</button>
      </div>
    </div>
  </div>
</div>`;

  //For onClick events inside Modal
  $('body').append(modalWrap);
  var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
  answerButtonClick(e, $answerChoices, $correctAnswer, $currentValue);

  $('.pass-button').on('click', (e) => {
    console.log("You have skipped this question!!");
    showIncorrectModal(e, $currentValue);
    updateScore($currentValue, false);
  });

  $("#mainModal").click(function (e) {
    if (e.target != this) return;
    $('#mainModal').modal('hide');
    $('.modal-backdrop').remove();
    showIncorrectModal(e, $currentValue);
    updateScore($currentValue, false);
  });

  modal.show();
}

///////////////// GAMEPLAY INCLUDING ANSWER CHECK, UPDATE SCORE, AND MODAL POPUPS AFTER QUESTION ///////////////////

// This function's job processes what happens when you click on an answer. 
const answerButtonClick = (e, $answerChoices, $correctAnswer, $currentValue) => {
  $('.answer-button').on('click', (e) => {
    const $currentChoice = $(e.currentTarget).text().trim();

    // Run Check Answer Function and pass info of clicked choice 
    checkAnswer(e, $currentChoice, $answerChoices, $correctAnswer, $currentValue);
 
  });
}

// A function that checks if the answer is correct or not. 
const checkAnswer = (e, $currentChoice, $answerChoices, $correctAnswer, $currentValue) => {
  let currentTargetButtton = $(e.currentTarget).attr('class'); //btn-outline-primary

  if ($currentChoice == $correctAnswer) {
    $(e.currentTarget).addClass('btn-success').removeClass('btn-outline-primary');
    showCorrectModal(e, $currentValue);
    updateScore($currentValue, true);

  } else {
    $(e.currentTarget).addClass('btn-danger').removeClass('btn-outline-primary');
    showIncorrectModal(e, $currentValue);
    updateScore($currentValue, false);
  }
}

// A function to update the score, whether they got it wrong or right. 
const updateScore = ($currentValue, ifCorrect) => {
  if (ifCorrect) {
    score += $currentValue;
  } else {
    score -= $currentValue;
  }
  const $calculatedScore = $('.calculatedScore');
  $calculatedScore.text(score);
}

// Modal that pops up if you answer correctly
const showCorrectModal = (e, $currentValue) => {

  //dont create multiple modals
  if (modalWrap !== null) {
    modalWrap.remove();
    $('.modal-backdrop').remove();
  }
  modalWrap = document.createElement('div');
  modalWrap.innerHTML = `<div class="modal fade" id="correct staticBackdrop" data-backdrop="static" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
      <h1 class="response-modal"> CORRECT! <br>You've gained <span class="text-success">$${$currentValue}</span></h1>
      </div>
      <div class="modal-footer">
 
        <button type="button" class="pass-button btn btn-success" data-dismiss="modal">Continue</button>
      </div>
    </div>
  </div>
</div>`;
  $('body').append(modalWrap);
  var correctModal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
  $('.modal-backdrop').modal({
    backdrop: 'static',
    keyboard: false
  });

  $('.pass-button').on('click', (e) => {
    $('#correct').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  });

  $("#correct").click(function (e) {
    if (e.target != this) return;
    $('#correct').modal('hide');
  });
  correctModal.show();
}

// modal that pops up if you answer incorrectly
const showIncorrectModal = (e, $currentValue) => {

  //dont create multiple modals
  if (modalWrap !== null) {
    modalWrap.remove();
    $('.modal-backdrop').remove();
  }
  modalWrap = document.createElement('div');
  modalWrap.innerHTML = `<div class="modal fade" id="incorrect staticBackdrop" data-backdrop="static" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
      <h1 class="response-modal"> INCORRECT! <br>You've lost <span class="text-danger">$${$currentValue}... </h1>
      </div>
      <div class="modal-footer">
        <button type="button" class="pass-button btn btn-danger" data-dismiss="modal">Continue</button>
      </div>
    </div>
  </div>
</div>`;
  $('body').append(modalWrap);
  var incorrectModal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
  $('.modal-backdrop').modal({
    backdrop: 'static',
    keyboard: false
  });

  $('.pass-button').on('click', (e) => {
    $('#correct').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  });

  incorrectModal.show();
}

/////////// START GAME -- INCLUDES EVENT HANDLERS //////////////
const startGame = () => {
  //Hide the Player 1, Score, and Timer DIV before the game starts
  $('.game-info').hide();

  let $startGame = $('.start-game-button');
  $startGame.on('click', (e) => {
    $('.opening').hide();
    //Create the Game Board 
    $('.game-info').show();
    createGameBoard();

    //start the timer 
    timer = setInterval(countDown, 1000);

    // Run the event handler that allows clicks to start opening questions/answers
    let $cost = $('.cost');
    $cost.on('click', (e) => {
      showModal(e);

      //prevents user from reclicking category price and removes CSS 
      $(e.currentTarget).removeClass("cost").empty();
    });
  })
}
//////////////// END GAME MODAL POP UP ////////////////////////
const endGame = () => {
  let gameOverWinText = null;

  //dont create multiple modals
  if (modalWrap !== null) {
    modalWrap.remove();
    $('.modal-backdrop').remove();
  }

  if (score > 0) {
    gameOverWinText = `You've won a total earnings of <span class='text-success'>$${score}!</span>`
  } else {
    gameOverWinText = `You've lost! You owe <span class='text-danger'>$${score}...</span>`
  }

  modalWrap = document.createElement('div');
  modalWrap.innerHTML = `<div class="modal fade" id="incorrect staticBackdrop" data-backdrop="static" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
      <h1 class="response-modal"> ${gameOverWinText}</h1>
      </div>
      <div class="modal-footer">
        <button type="button" class="restart-button btn btn-danger" data-dismiss="modal">Play again?</button>
      </div>
    </div>
  </div>
</div>`;
  $('body').append(modalWrap);
  var gameOverModal = new bootstrap.Modal(modalWrap.querySelector('.modal'));

  $('.modal-backdrop').modal({
    backdrop: 'static',
    keyboard: false
  });

  //Allow restarting the game. 
  $('.restart-button').on('click', (e) => {
    window.location.reload();
  });
  gameOverModal.show();
}

startGame();