function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function (answer) {
  if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function () {
  return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function () {
  return this.currentQuestionIndex >= this.questions.length;
};

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};

var QuizUI = {
  displayNext: function () {
    if (quiz.hasEnded()) {
      this.displayScore();
    } else {
      this.displayTest();
      this.displayChoices();
      this.displayProgress();
    }
  },

  displayIntro: function () {
    var introHTML = "<h1>Javascript Quiz</h1>";

    introHTML += "<h2>Pass this quiz about JS</h2>";

    introHTML += '<button id="start" class="quiz__btn"><p>GO</p></button>';

    this.populateIdWithHTML("quiz", introHTML);
  },

  displayTest: function () {
    var testHTML = "<h1>Javascript Quiz</h1>";

    // Display question

    testHTML += '<h2 id="question">' + quiz.getCurrentQuestion().text + "</h2>";

    var choices = quiz.getCurrentQuestion().choices;
    for (var i = 0; i < choices.length; i++) {
      testHTML +=
        '<button id="guess' +
        i +
        '" class="quiz__btn"><p id="choice' +
        i +
        '"></p></button>';
    }

    testHTML += '<p id="progress" class="quiz__progress">Question x of y</p>';

    this.populateIdWithHTML("quiz", testHTML);
  },

  displayChoices: function () {
    var choices = quiz.getCurrentQuestion().choices;

    for (var i = 0; i < choices.length; i++) {
      this.populateIdWithHTML("choice" + i, choices[i]);
      this.guessHandler("guess" + i, choices[i]);
    }
  },

  displayScore: function () {
    // var myWebSite = "https://faynco.github.io";

    var gameOverHTML = "<h1>Game Over</h1>";
    gameOverHTML +=
      "<h2> Your score: " +
      quiz.score +
      " out of " +
      quiz.questions.length +
      "</h2>";

    switch (quiz.score) {
      case 7:
        gameOverHTML += "<h2>Great!</h2>";
        break;
      case 6:
      case 5:
      case 4:
        gameOverHTML += "<h2>Not bad!</h2>";
        break;
      case 3:
      case 2:
        gameOverHTML += "<h2>Bad!</h2>";
        break;
      default:
        gameOverHTML += "<h2>Just try again!</h2>";
    }

    gameOverHTML += this.populateIdWithHTML("quiz", gameOverHTML);
  },

  displayProgress: function () {
    var currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.populateIdWithHTML(
      "progress",
      "Question " + currentQuestionNumber + " out of " + quiz.questions.length
    );
  },

  populateIdWithHTML: function (id, text) {
    var element = document.getElementById(id);
    element.innerHTML = text;
  },

  guessHandler: function (id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
      quiz.guess(guess);
      QuizUI.displayNext();
    };
  },
};

// Create Questions
var questions = [
  new Question(
    "Inside which HTML element do we put the JavaScript?",
    ["< js >", "< javascript >", "< script >", "< scripting >"],
    "< script >"
  ),

  new Question(
    `What is the correct JavaScript syntax to change the content of the HTML element below?

    < p id="demo" >This is a demonstration.< /p >`,
    [
      'document.getElementByName("p").innerHTML = "Hello World!";',
      'document.getElement("p").innerHTML = "Hello World!";',
      'document.getElementById("demo").innerHTML = "Hello World!";',
      '#demo.innerHTML = "Hello World!";',
    ],
    'document.getElementById("demo").innerHTML = "Hello World!";'
  ),

  new Question(
    "Where is the correct place to insert a JavaScript?",
    ["In the < body >", "In the < head >", "Both correct", "Both incorrect"],
    "Both correct"
  ),

  new Question(
    'What is the correct syntax for referring to an external script called "xxx.js"?',
    [
      '< script name="xxx.js" >',
      '< script href="xxx.js" >',
      '< script src="xxx.js" >',
      '< script link="xxx.js" >',
    ],
    ' <script src="xxx.js" >'
  ),

  new Question(
    'How do you write "Hello World" in an alert box?',
    [
      'msgBox("Hello World");',
      'alertBox("Hello World");',
      'alert("Hello World");',
      ' msg("Hello World");',
    ],
    'alert("Hello World");'
  ),

  new Question(
    "How do you create a function in JavaScript?",
    [
      "function:myFunction()",
      "function myFunction()",
      "function = myFunction()",
      "export = myFunction()",
    ],
    "function myFunction()"
  ),

  new Question(
    'How do you call a function named "myFunction"?',
    ["myFunction()", "call myFunction()", "call myFunction", "myFunction"],
    "myFunction()"
  ),
];

// Create Quiz
var quiz = new Quiz(questions);

// Display Quiz
QuizUI.displayIntro();

// motion

function start() {
  console.log("start");
}

function middle() {
  console.log("middle");
}

function end() {
  console.log("end");
}

var pixelwave = new PixelWave({
  color: "#000000",
});

// buttons with jquery except for event listeners

$(document).on("click", "#start", function () {
  QuizUI.displayNext();
});
$(document).on("click", "button", function () {
  pixelwave.start();
});
