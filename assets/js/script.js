// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerInterval
var correctAnswer = ''

// variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');
var finalScoreEl = document.getElementById('final-score');


function startQuiz() {
     // hide start screen
    document.getElementById("start-screen").style.display="none";
    // un-hide questions section
    questionsEl.removeAttribute ("class")
    //start timer (high)
    timerEl.textContent=time

    clockTick()

    //show starting time (high)

    getQuestion(); 
}

function getQuestion() { 
    //this function is going to get the data from the questions array
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex]
    correctAnswer = currentQuestion.answer 

    // update title with current question
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;

    // clear out any old question choices
    choicesEl.innerHTML = ''; 
    feedbackEl.setAttribute ('class', 'hide')

    // create a for loop that creates the choice elements
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choiceBtn =document.createElement('button');
        choiceBtn.textContent= currentQuestion.choices[i]
        choiceBtn.setAttribute ("class", "choices")
        choiceBtn.style.cssText = "border-radius: 20%; color:white; background-color: rgba(35, 7, 62, 0.597); width: 150px; padding: 10px; margin: 20px; display: block; font-size: 16;";
        choicesEl.appendChild (choiceBtn);
    }
}


function questionClick(event) {
    var buttonEl = event.target;
    // if the clicked element is not a choice button, do nothing.

    if (!buttonEl.matches('.choices')) {
        return;
    }
    
    // check if user guessed right or wrong
    if (buttonEl.textContent != correctAnswer) { //replace true with a conditional statement that checks if the clicked choice button's value is the same as the questions[currentQuestionIndex]'s answer
        //incorrect answer scenario
        time= time -15;
        feedbackEl.removeAttribute('class');
        feedbackEl.textContent= "Nope!";
        // penalize time
        // display new time on page
    } else {
        //correct scenario
        feedbackEl.removeAttribute('class');
        feedbackEl.textContent= "Correct!";
        // move to next question
    }
    // flash right/wrong feedback on page

    // move to next question
    currentQuestionIndex++;

    // check if we've run out of questions
    if (time === 0 || currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function clockTick() {
    // update time
    timerInterval = setInterval(function() {
      time--
      timerEl.textContent = time;

    // check if user ran out of time
      if (time === 0) {
        quizEnd();
      }
    }, 1000);
}

function quizEnd() {
    // stop timer
    

    // show end screen
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');

    // show final score
    
    finalScoreEl.innerHTML = time;
    clearInterval(timerInterval);
    // hide questions section
    questionsEl.setAttribute('class', 'hide');
}


          
function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();

    // make sure value wasn't empty
    if (initials !== '') {
       var highScores = JSON.parse (window.localStorage.getItem ('highScores')) || [];
        var newScore = {
            user: initials, 
            score: time
        }
       highScores.push (newScore);
       window.localStorage.setItem ('highScores', JSON.stringify (highScores))
        window.location.href = 'highscores.html';
    }
}

function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === 'Enter') {
        saveHighscore();
    }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

// user clicks on element containing choices
choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;

//declare function to endQuiz

//call setTime function
