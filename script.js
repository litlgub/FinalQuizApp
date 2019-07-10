'use strict';

const STORE = [
  {
    number: 1,
    question: 'Which film won best picture in 1955?',
    ans1: 'Marty',
    ans2: 'On the Waterfront',
    ans3: 'A Star Is Born',
    ans4: 'The Wizard of OZ',
    correct: 'Marty',
    ansID: '#ans1'
  },
  {
    number: 2,
    question: 'Which Hitchcock movie includes an animated sequence by Salvidor Dali?',
    ans1: 'The trouble with Harry',
    ans2: 'Vertigo',
    ans3: 'Psycho',
    ans4: 'Spellbound',
    correct: 'Spellbound',
    ansID: '#ans4'
  },
  {
    number: 3,
    question: 'What is a "sleeper"?',
    ans1: 'A boring movie',
    ans2: 'A long movie',
    ans3: 'A movie that wasnt appreciated when released',
    ans4: 'A movie that had delayed production',
    correct: 'A movie that wasnt appreciated when released',
    ansID: '#ans3'
  },
  {
    number: 4,
    question: 'Which film coined the term "blockbuster"?',
    ans1: 'Star Wars',
    ans2: 'Jaws',
    ans3: 'A Star is Born',
    ans4: 'Gone with the Wind',
    correct: 'Jaws',
    ansID: '#ans2'
  },
  {
    number: 5,
    question: 'What is a "B" movie?',
    ans1: 'A low budget movie',
    ans2: 'A bad movie',
    ans3: 'A movie made to be part of a double feature',
    ans4: 'A movie made on a studios "B" lot',
    correct: 'A movie made to be part of a double feature',
    ansID: '#ans3'
  },
  {
    number: 6,
    question: 'What is considered the "Golden Year" of cinema?',
    ans1: '1955',
    ans2: '1939',
    ans3: '1968',
    ans4: '1944',
    correct: '1939',
    ansID: '#ans2'
  },
  {
    number: 7,
    question: 'Which movie is NOT based on a book by Twilight Zone writer Richard Matheson?',
    ans1: 'The Omega Man',
    ans2: 'I am Legend',
    ans3: 'What Dreams May Come',
    ans4: 'Last Woman on Earth',
    correct: 'Last Woman on Earth',
    ansID: '#ans4'
  },
  {
    number: 8,
    question: 'Which animated movie was the last film Walt Disney worked on before he died?',
    ans1: 'Sleeping Beauty',
    ans2: 'The Little Mermaid',
    ans3: 'The Jungle Book',
    ans4: 'The Black Cauldron',
    correct: 'The Jungle Book',
    ansID: '#ans3'
  }
  

];
  let questionTrak = 0;
  let score = 0;

function handleBegin () {
  $('main').on('click', '.begin', function(e){
    e.preventDefault();

    console.log("Inside handleBegin");
    displayQuestion();
    resetScore();
  });
}

function updateScore(){
  $('.questionNum').text(questionTrak + 1);
  $('.correctNum').text(score);
}

function displayQuestion(){

  $('.container').html(`
    <h2 class="textBox">${STORE[questionTrak].question}</h2>
    <form> 
      <fieldset> 
        <input type="radio" name="option" id="ans1" checked></input>
        <span>${STORE [questionTrak].ans1}</span>
        <br>
        <input type="radio" name="option" id="ans2"></input>
        <span>${STORE [questionTrak].ans2}</span>
        <br>
        <input type="radio" name="option" id="ans3"></input>
        <span>${STORE [questionTrak].ans3}</span>
        <br>
        <input type="radio" name="option" id="ans4"></input>
        <span>${STORE [questionTrak].ans4}</span>
      </fieldset>
      <div id="submitButton">
        <button type="submit" class="submitAnswer">
            <span>Submit</span>
        </button>
      </div>
    </form>`);
}

function handleSubmitAnswer(){
  $('main').on('click', '.submitAnswer', function(e){
    e.preventDefault();
    console.log("Inside handleSubmitAnswer");

    let rightAnswer = STORE[questionTrak].correct;
    let answer = $('input[type=radio]:checked').next('span');
    let correctId = STORE[questionTrak].ansID;

    console.log("Right answer", rightAnswer);
    console.log("Picked answer", answer.text());

    if (answer.text() === rightAnswer) {
      $(answer).addClass('correctAnswer');
      $('.textBox').html(`<h2 class="correctAnswer">Correct!</h2>`);
      score ++;
    } 
    else {
      $(answer).addClass('incorrectAnswer');
      $('.textBox').html(`<h2 class="incorrectAnswer">Incorrect</h2>`);
      $(correctId).next('span').addClass('correctAnswer');
      console.log(correctId);
    }
    $('input[type=radio]').prop('disabled', true);
    $('#submitButton').html(`<button type="submit" class="nextQuestion">
                                <span>Next</span>
                            </button>`)
    updateScore();
  });
}

function handleNextQuestion(){
  $('main').on('click', '.nextQuestion', function(e){
    e.preventDefault();
    questionTrak ++;
    updateScore();
    console.log("Inside handleNextQuestion");
    if (questionTrak < STORE.length) {
    displayQuestion();
    } else {
    handleEnd();
    }
    
  });
}

function handleEnd() {
  $('.container').html(`<h2>${score} out of 8</h2>
  <form>
  <div class="buttonBox">
  <button class="startOver" type="submit">
  <span>Start Over?</span>
  </button>
  </div>
  </form>`);
  let questionTrak = 8;
  $('.questionNum').text(questionTrak);
  
  
  
  
  

}

function resetScore() {
let questionTrak = 0;
let score = 0;
$('.questionNum').text(questionTrak + 1);
$('.correctNum').text(score);
}

function startOver() {
  $('main').on('click', '.startOver', function(e){
    e.preventDefault();
    location.reload();
    console.log('insideStartOver');
    
    
    
  });

}


handleBegin();
handleSubmitAnswer();
handleNextQuestion();
startOver();







