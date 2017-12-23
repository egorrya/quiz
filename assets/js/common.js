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

  displayIntro: function() {
    var introHTML = "<h1>Мем-тест</h1>";

    introHTML += '<h2>Пройди этот тест на знания последних мем-тенденций и узнай насколько ты крут</h2>';

    introHTML += '<button id="start" class="quiz__btn"><p>Начать тест</p></button>';
    
    this.populateIdWithHTML("quiz", introHTML);
  },

  displayTest: function() {
    var testHTML = "<h1>Мем-тест</h1>";

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
    
    switch (quiz.score) {
      case 7:
      gameOverHTML += '<h2>Да вы батенька, ЦАРЬ МЕМОВ!</h2>';
      break;
      case 6:
      case 5:
      case 4:
      gameOverHTML += '<h2>Неплохо-неплохо, Мужиииик (для феминисток мужик_ца)!</h2>';
      break;
      case 3:
      case 2:
      gameOverHTML += '<h2>Слабенько, на пересдачу!</h2>';
      break;
      default:
      gameOverHTML += '<h2>Тебе не стоило прогуливать уроки мемологии</h2>';
    }

    gameOverHTML += '<h3 id="me" class="quiz__me">Этот тест был разработан <a href=' + myWebSite + '>этим парнем</a></h3>';
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
new Question("АЁУ А Как поднять бабла?", [  
  "Вулкан",
  "1XBet", 
  "Азино 777", 
  "Leon"], "Азино 777"),

new Question("Кто из богов создал вселенную после сильного алкогольного опьянения?", 
  [ 
  "Бога нет",
  "Иисус мать его Христос", 
  "Пьяный батя", 
  "Летающий Макаронный Монстр"], "Летающий Макаронный Монстр"),

new Question("... Нэвэльный!", [ 
  "Блин",
  "блэт", 
  "Бляд",
  "Blut"], "блэт"),

new Question("Из какой страны повар, соль которого, прежде чем попасть в блюдо, попадает на его локоть?", [ 
  "Из Германии",
  "Из Турции",
  "Из Армении",
  "Из Израиля"], "Из Турции"),

new Question("Да ты пидр епта!", [ 
  "ДА ДЕТКА ЭТО КАМИНГ АУТ",
  "Нет, что ты",
  "А может ты пидор?",
  "ты што ебонутый"], "А может ты пидор?"),

new Question("Somebody once told me...", [ 
  "...i'm gorgeous",
  "...that i'll be a president",
  "...the world is gonna roll me",
  "...my arm is too big"], "...the world is gonna roll me"),

new Question("Какой фразы не было на баттле оксимирона с гнойным?", [ 
  "камон камон",
  "еее бой",
  "изи изи",
  "рил ток"], "камон камон"),
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
  color: '#000000'      
});

// buttons with jquery except for event listeners

$(document).on('click','#start', function(){
  QuizUI.displayNext();
});
$(document).on('click','button', function(){
  pixelwave.start();
});