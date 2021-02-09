//Call your global variables
let modalWrap = null;
let score = 0; 
let timer = null; 

// Jeopardy Game Questions and Answers in an array of objects. 
const gameCategories = {
  category1: [{categoryName: 'Famous POCs'
    }, {
      costQuestionAnswer: [{cost: 200, question: "This minister and Civil Rights Activist was born on January 15, 1929.", answers: ["Dalai Lama", "Martin Luther King Jr.", "Frances Scott Key", "Malcolm X"], correctAnswer: "Martin Luther King Jr."}],
    },
    { costQuestionAnswer: [{cost: 400, question: "This singer is known for hits such as 'Single Ladies' and 'Irreplaceable'", answers: ["Beyoncé", "Aaliyah", "Jhene Aiko", "Sade"], correctAnswer: "Beyoncé"}],
    },
    { costQuestionAnswer: [{cost: 600, question: "He is known for movies such as 'Drunken Master' and 'Rush Hour'", answers: ["Bruce Lee", "Diego Luna", "Ken Wantanabe", "Jackie Chan"], correctAnswer: "Jackie Chan"}],
    },
    {costQuestionAnswer: [{cost: 800, question: "'Kiss from a Rose' was his popular hit in 1994.'", answers: ["Coolio", "La Bouche", "Seal", "Brian McKnight"], correctAnswer: "Seal"}],
    },
    {costQuestionAnswer: [{cost: 1000, question: "Author of 'The Next American Revolution' this Detroit-based Chinese-American social activist passed away in 2015." , answers: ["Grace Lee Boggs", "Yuri Kochiyama", "Erika Lee", "Wei-Han Huang"], correctAnswer: "Grace Lee Boggs"}],
  }], //end of Category 1 

  category2: [{categoryName: 'Steven Universe'
  }, {
    costQuestionAnswer: [{cost: 200, question: "Used to protect his loved ones, Steven's weapon is a pink this ",answers: ["Shield", "Sword", "Mace", "Trident"], correctAnswer: "Shield"}],
  },
  { costQuestionAnswer: [{cost: 400, question: "The name of the city where the Crystal Gems reside", answers: ["Port City", "Ocean Town", "Emeryville", "Beach City"], correctAnswer: "Beach City"}],
  },
  { costQuestionAnswer: [{cost: 600, question: "When Pearl and Amethyst fuse, they form this:", answers: ["Sugilite", "Zoicite", "Opal", "Obsidian"], correctAnswer: "Opal"}],
  },
  {costQuestionAnswer: [{cost: 800, question: "This creator of Steven Universe is also known for their work on Cartoon Network's 'Adventure Time'", answers: ["Nancy Cartwright", "Rebecca Sugar", "DeeDee Magno Hall", "Ian Jones-Quarterly"], correctAnswer: "Rebecca Sugar"}],
  },
  {costQuestionAnswer: [{cost: 1000, question: "Garnet is known as a fusion between", answers: ["Ruby and Peridot", "Sapphire and Jade", "Amethyst and Jasper", "Ruby and Sapphire"], correctAnswer: "test"}],
  }], //end of Category 2 

  category3: [{categoryName: '00s Music'
}, {
  costQuestionAnswer: [{cost: 200, question: "Often spelling her name in music, this 'London Bridge' singer is also a member of the Black Eye Peas",answers: ["Fergie", "Derpy", "JLO", "Conor Oberst"], correctAnswer: "Fergie"}],
},
{ costQuestionAnswer: [{cost: 400, question: "Known for the album 'Transatlanticism' this indie band's lead singer also created the band 'The Postal Service'", answers: ["Jared Leto", "Anthony White", "Ben Gibbard", "Dustin Krenshue"], correctAnswer: "Ben Gibbard"}],
},
{ costQuestionAnswer: [{cost: 600, question: "The film Shrek featured this artist's hit song 'Cigarettes and Chocolate Milk'", answers: ["Lily Allen", "The Shins", "Feist", "Rufus Wainwright"], correctAnswer: "Rufus Wainwright"}],
},
{costQuestionAnswer: [{cost: 800, question: "This Russian-born American songwriter is famous for their songs 'Fidelity' and 'Samson'", answers: ["Andrew Bird", "Coco Rosie", "Regina Spektor", "Sufjan Stevens"], correctAnswer: "Regina Spektor"}],
},
{costQuestionAnswer: [{cost: 1000, question: "This artist began naming their albums after all 50 US states but only made two albums featuring 'Illinois' and 'Michigan'", answers: ["Mark Ronson", "Sufjan Stevens", "Elliot Smith", "Minus the Bear"], correctAnswer: "Sufjan Stevens"}],
  }], //end of Category 3 

  category4: [{categoryName: 'Capitals'
  }, {
  costQuestionAnswer: [{cost: 200, question: "China", answers: ["Shanghai", "Beijing", "Guangzhou", "Hong Kong"], correctAnswer: "Beijing"}],
  },
  { costQuestionAnswer: [{cost: 400, question: "Mexico", answers: ["Mexico City", "Aguascalientes", "Oaxaca", "Guadalajara"], correctAnswer: "Mexico City"}],
  },
  { costQuestionAnswer: [{cost: 600, question: "Hungary", answers: ["Miskolc", "Szeged", "Pécs", "Budapest"], correctAnswer: "Budapest"}],
  },
  {costQuestionAnswer: [{cost: 800, question: "Cambodia", answers: ["Siem Reap", "Battambang", "Phnom Penh", "Sihanoukville"], correctAnswer: "Phnom Penh"}],
  },
  {costQuestionAnswer: [{cost: 1000, question: "Slovenia", answers: ["Ljubljana", "Bled", "Maribor", "Koper"], correctAnswer: "Ljubljana"}],
  }], //end of Category 2 

  category5: [{categoryName: '90s Television'
  }, {
  costQuestionAnswer: [{cost: 200, question: "This animated show featured characters including 'Bart', 'Lisa', and 'Maggie'",answers: ["South Park", "The Simpsons", "The Critic", "Animaniacs"], correctAnswer: "test"}],
  },
  { costQuestionAnswer: [{cost: 400, question: "Moesha starred this famous R&B Singer", answers: ["Monica", "Brandy", "Lauryn Hill", "Janet Jackson"], correctAnswer: "Brandy"}],
  },
  { costQuestionAnswer: [{cost: 600, question: "Claire Danes and Jared Leto starred in this short-lived teenage drama on ABC", answers: ["Queer as Folk", "Step by Step", "Family Matters", "My So-Called Life"], correctAnswer: "My So-Called Life"}],
  },
  {costQuestionAnswer: [{cost: 800, question: "This show centered on six people consisting of four women and two men living in Prospect Heights, Brooklyn.", answers: ["Martin", "Living Single", "Sister Sister", "Family Matters"], correctAnswer: "Living Single"}],
  },
  {costQuestionAnswer: [{cost: 1000, question: "Helen Hunt and Paul Riser starred in this sitcom about a newly wed couple in New York", answers: ["Mad About You", "Caroline in the City", "Spin City", "Coach"], correctAnswer: "Mad About You"}],
  }], //end of Category 5 

  category6: [{categoryName: 'Final Fantasy'
  }, {
  costQuestionAnswer: [{cost: 200, question: "Cloud, Tifa, Aeris, Barret, Sephiroth", answers: ["Final Fantasy 3", "Final Fantasy 8", "Final Fantasy 9", "Final Fantasy 7"], correctAnswer: "Final Fantasy 7"}],
  },
  { costQuestionAnswer: [{cost: 400, question: "Zidane, Garnet, Eiko, Stiner", answers: ["Final Fantasy 9", "Final Fantasy 2", "Final Fantasy 13", "Final Fantasy 3"], correctAnswer: "Final Fantasy 9"}],
  },
  { costQuestionAnswer: [{cost: 600, question: "Lighting, Sazh, Oerba, Hope", answers: ["Final Fantasy 13", "Final Fantasy 4", "Final Fantasy 8", "Final Fantasy"], correctAnswer: "Final Fantasy 13"}],
  },
  {costQuestionAnswer: [{cost: 800, question: "Squall, Rinoa, Selphie, Quistis", answers: ["Final Fantasy 2", "Final Fantasy 8", "Final Fantasy 15", "Final Fantasy 5"], correctAnswer: "Final Fantasy 8"}],
  },
  {costQuestionAnswer: [{cost: 1000, question: "Rydia, Cecil, Edward, Golbez", answers: ["Final Fantasy 16", "Final Fantasy 13", "Final Fantasy 4", "Final Fantasy"], correctAnswer: "Final Fantasy 4"}],
  }], //end of Category 6 
  }; //end of gamecategories array

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
    const gameBoard = $('.board');
    gameBoard.append($boardColumns);
  } //end of for in loop
}


const addQuestions = (e) => {
  let $currentColumn = ($(e.currentTarget).children().attr('class').split(' ')[1]); 
  let $currentQuestionNumber = ($(e.currentTarget).children().attr('id'));
  let $currentQuestion = (gameCategories[$currentColumn][$currentQuestionNumber].costQuestionAnswer[0].question);
  let $answerChoices = (gameCategories[$currentColumn][$currentQuestionNumber].costQuestionAnswer[0].answers);
  let $correctAnswer = (gameCategories[$currentColumn][$currentQuestionNumber].costQuestionAnswer[0].correctAnswer);

  console.log($answerChoices.length);

  const $modalBody = $('.modal-body');

  console.log($modalBody);
  
  const test = "Test";
  $modalBody.append(test);
  
  for (let i = 0; i <$answerChoices.length; i++) {
    $modalBody.append(test);
    
  } 
const $answerButtons = ("<div class='row'><div class='center'><div class='col-md-12'><button class='answer-button btn-primary btn-lg col-md-12 text-center' id='button' data-name='" + $answerChoices[0] + "'> <div class='divider'/>" + $answerChoices[0] + "</button></div></div></div>" + 

"<div class='row'><div class='center'><div class='col-md-12'><button class='answer-button btn-success btn-lg col-md-12 text-center' id='button' data-name='" + $answerChoices[1] + "'> <div class='divider'/>" + $answerChoices[1] + "</button></div></div></div>" +

"<div class='row'><div class='center'><div class='col-md-12'><button class='answer-button btn-danger btn-lg col-md-12 text-center' id='button' data-name='" + $answerChoices[2] + "'> <div class='divider'/>" + $answerChoices[2] + "</button></div></div></div>"+

"<div class='row'><div class='center'><div class='col-md-12'><button class='answer-button btn-info btn-lg col-md-12 text-center' id='button' data-name='" + $answerChoices[3] + "'> <div class='divider'/>" + $answerChoices[3] + "</button></div></div></div>"
);

return $answerButtons;

return $answerButtons.on('click', (f) => {
  console.log("The button was clicked!");
});

}

// This function's job processes what happens when you click on an answer. 
const answerButtonClick = (e, $answerChoices, $correctAnswer) => {

  $('.answer-button').on('click', (e) => { 
    const $currentChoice = $(e.currentTarget).text().trim(); //Current Answer Choice. Trim to eliminate spaces in the beginning and end of the string   
    checkAnswer(e, $currentChoice, $answerChoices, $correctAnswer); // Run Check Answer Function and pass info of clicked choice 
    return $currentChoice; //Return the current choice... if needed?
  });
}

// Modal Function that shows question, answer, 
const showModal = (e) => {

  let $currentColumn = ($(e.currentTarget).children().attr('class').split(' ')[1]); 
  let $currentQuestionNumber = ($(e.currentTarget).children().attr('id'));
  let $currentQuestion = (gameCategories[$currentColumn][$currentQuestionNumber].costQuestionAnswer[0].question);
  let $answerChoices = (gameCategories[$currentColumn][$currentQuestionNumber].costQuestionAnswer[0].answers);
  let $correctAnswer = (gameCategories[$currentColumn][$currentQuestionNumber].costQuestionAnswer[0].correctAnswer);
  let $answerButtons = addQuestions(e);


  //dont create multiple modals
  if (modalWrap !== null) {
    modalWrap.remove();
  }
  modalWrap = document.createElement('div');
  modalWrap.innerHTML = `<div class="modal fade" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">${$currentQuestion}</h5>
        <button type="button" class="pass-button btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      ${ $answerButtons }
      </div>
      <div class="modal-footer">
        <button type="button" class="pass-button btn btn-danger" data-dismiss="modal">Pass</button>
      </div>
    </div>
  </div>
</div>`;
  document.body.append(modalWrap);
  var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));

  answerButtonClick(e, $answerChoices, $correctAnswer);

  $('.pass-button').on('click', (e) => { 
    console.log("You have skipped this question!!");
  });


  modal.show();



}


const startGame = () => {

  //Create the Game Board 
  createGameBoard();

}

// a function that checks if the answer is correct or not. 
const checkAnswer = (e, $currentChoice, $answerChoices, $correctAnswer) => {


   console.log($currentChoice);
  // console.log("This is the answer choices: "+ $answerChoices);
  console.log($correctAnswer);

  if ($currentChoice == $correctAnswer) {
    console.log("The correct answer was chosen!");
  } else {
    console.log("The incorrect answer was chosen!");
  }
 



}


const startTimer = () => {
//Put code in here for timer to countdown in each of the modals
}

// Call functions and onclick events here
startGame(); 

//On Clicks
let $cost = $('.cost');
$cost.on('click', (e) => {
  //console.log($(e.currentTarget).parent());
  showModal(e);
  let $answerButton = $('answer-button');

  console.log($answerButton);
  //console.log($(e.currentTarget).children().text()); //the text of the number 
  //console.log($(e.currentTarget).parent().parent());
});







