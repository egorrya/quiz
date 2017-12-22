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
      this.displayQuestion();
      this.displayChoices();
      this.displayProgress();
    }
  },
  displayQuestion: function() {
    this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
  },
  displayChoices: function() {
    var choices = quiz.getCurrentQuestion().choices;

    for(var i = 0; i < choices.length; i++) {
      this.populateIdWithHTML("choice" + i, choices[i]);
      this.guessHandler("guess" + i, choices[i]);
    }
  },
  displayScore: function() {
    var gameOverHTML = "<h1>Game Over</h1>";
    gameOverHTML += "<h2> Твой счет: " + quiz.score + "</h2>";
    this.populateIdWithHTML("quiz", gameOverHTML);
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
  },

  displayProgress: function() {
    var currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.populateIdWithHTML("progress", "Вопрос " + currentQuestionNumber + " из " + quiz.questions.length);
  }
};

// Create Questions
var questions = [
new Question("Путин Красавчик?", [ "ПОРВУ ЗА ПУТИНА", "не"], "ПОРВУ ЗА ПУТИНА"),
];

// Create Quiz
var quiz = new Quiz(questions);

// Display Quiz
QuizUI.displayNext();

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
  speedIn: .7,
  speedOut: .8,
  color: '#000000'      
});

document.getElementById('guess0').addEventListener('click', function() {
  pixelwave.start(start, middle, end);
})
document.getElementById('guess1').addEventListener('click', function() {
  pixelwave.start(start, middle, end);
})
document.getElementById('guess2').addEventListener('click', function() {
  pixelwave.start(start, middle, end);
})
document.getElementById('guess3').addEventListener('click', function() {
  pixelwave.start(start, middle, end);
})