function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function(answer) {
  if(this.getCurrentQuestion().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function() {
  return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
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

  displayTest: function() {
    var testHTML = "<h1>Крутой тест</h1>";

    // Display question

    testHTML += '<h2 id="question">' + quiz.getCurrentQuestion().text + '</h2>';

    var choices = quiz.getCurrentQuestion().choices;
    for(var i = 0; i < choices.length; i++) {
      testHTML += '<button id="guess' + i + '" class="quiz__btn"><p id="choice' + i +'"></p></button>';
    }

    testHTML += '<p id="progress" class="quiz__progress">Question x of y</p>';

    this.populateIdWithHTML("quiz", testHTML);
  },

  displayChoices: function() {
    var choices = quiz.getCurrentQuestion().choices;

    for(var i = 0; i < choices.length; i++) {
      this.populateIdWithHTML("choice" + i, choices[i]);
      this.guessHandler("guess" + i, choices[i]);
    }
  },

  displayScore: function() {
    var myWebSite = "https://faynco.github.io";
    var gameOverHTML = "<h1>Game Over</h1>";
    gameOverHTML += "<h2> Твой счет: " + quiz.score + " из " + quiz.questions.length + "</h2>";
    gameOverHTML += '<h3 id="me" class="quiz__me">Этот тест был разработан <a href=' + myWebSite + '>этим парнем</a> </h3>';
    this.populateIdWithHTML("quiz", gameOverHTML);
  },

  displayProgress: function() {
    var currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.populateIdWithHTML("progress", "Вопрос " + currentQuestionNumber + " из " + quiz.questions.length);
  },

  populateIdWithHTML: function(id, text) {
    var element = document.getElementById(id);
    element.innerHTML = text;
  },

  guessHandler: function(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
      quiz.guess(guess);
      QuizUI.displayNext();
    }
  }
};

// Create Questions
var questions = [
new Question("Путин Красавчик?", [ "ПОРВУ ЗА ПУТИНА", "НЕ"], "ПОРВУ ЗА ПУТИНА"),
new Question("Путин Красавчик?", [ "ПОРВУ ЗА ПУТИНА", "НЕ", "НЕT BLYAT"], "ПОРВУ ЗА ПУТИНА"),
];

// Create Quiz
var quiz = new Quiz(questions);

// Display Quiz
QuizUI.displayIntro();

// motion

function start () {
  console.log('start');
}

function middle () {
  console.log('middle');
}

function end () {
  console.log('end');     
}

var pixelwave = new PixelWave({
  canvasTop: 0,    
  speedIn: .8,
  speedOut: .9,
  color: '#000000'      
});

document.getElementById('guess0').addEventListener('click', function() {
  pixelwave.start();
})
document.getElementById('guess1').addEventListener('click', function() {
  pixelwave.start();
})
document.getElementById('guess2').addEventListener('click', function() {
  pixelwave.start();
})
document.getElementById('guess3').addEventListener('click', function() {
  pixelwave.start();
})