const questions = [
  {
      question: "Which of the following famous landmarks cannot be found in Pennsylvania?",
      optionA: "Liberty Bell",
      optionB: "Mount Rushmore",
      optionC: "Independence Hall",
      optionD: "Hershey Park",
      correctOption: "optionB"
  },
  
  
 
  {
      question: "Which “f-stop” camera aperture setting is the smallest?",
      optionA: "f/22",
      optionB: "f/16",
      optionC: "f/2.8",
      optionD: "f/0",
      correctOption: "optionA"
  },

  {
      question: "Which red-haired politician was the only president to sit on the supreme court?",
      optionA: "Clinton",
      optionB: "Bush",
      optionC: "Taft",
      optionD: "Obama",
      correctOption: "optionC"
  },

  {
      question: "Which of the following is an animal rights organization?",
      optionA: "Clorox",
      optionB: "Estee Lauder",
      optionC: "PETA",
      optionD: "L'Oreal",
      correctOption: "optionC"
  },

  {
      question: "What was the first question to this quiz?",
      optionA: "Where is Mount Rushmore?",
      optionB: "What does f-stop? mean?",
      optionC: "What is PETA?",
      optionD: "What is your name?",
      correctOption: "optionB"
  },

  {
      question: "Which amendment surrounded the United States of America v. Robert J. Stevens case?",
      optionA: "50th",
      optionB: "28th",
      optionC: "1st",
      optionD: "30th",
      correctOption: "optionC"
  },

  {
      question: "How many judges are there on the supreme court?",
      optionA: "9",
      optionB: "9",
      optionC: "9",
      optionD: "9",
      correctOption: "optionD"
  },


  {
      question: "Which case limits what is protected under free speech?",
      optionA: "Brandenburg v. Ohio",
      optionB: "Roth v. United States",
      optionC: "United States v. O’Brien",
      optionD: "Morse v. Frederick",
      correctOption: "optionB"
  },

  {
      question: "How many prisions are there in the United States (including territories)?",
      optionA: " ",
      optionB: " ",
      optionC: " ",
      optionD: " ",
      correctOption: "optionB"
  },

  {
      question: "What was the ultimate ruling on US vs Stevens?",
      optionA: "7-2 (unconstitutional)",
      optionB: "5-4 (unconstitutional)",
      optionC: "3-6 (constitutional)",
      optionD: "1-8 (constitutional)",
      correctOption: "optionC"
  }



]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() { 
  //function to shuffle and push 10 questions to shuffledQuestions array
  
    while (shuffledQuestions.length < questions.length){
    for (let i = 0; i < questions.length; i++){
      shuffledQuestions.push(questions[i]);
    }
  }
}



let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
  handleQuestions()
  const currentQuestion = shuffledQuestions[index]
  document.getElementById("question-number").innerHTML = questionNumber
  // document.getElementById("player-score").innerHTML = playerScore 
  document.getElementById("display-question").innerHTML = currentQuestion.question;
  document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
  document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
  document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
  document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
  const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
  const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
  let correctOption = null

  options.forEach((option) => {
      if (option.value === currentQuestionAnswer) {
          //get's correct's radio input with correct answer
          correctOption = option.labels[0].id
      }
  })
 
  //checking to make sure a radio input has been checked or an option being chosen
  if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
      document.getElementById('option-modal').style.display = "flex"
  }

  //checking if checked radio button is same as answer
  options.forEach((option) => {
      if (option.checked === true && option.value === currentQuestionAnswer) {
          // document.getElementById(correctOption).style.backgroundColor = "green"
          // playerScore++
          indexNumber++
          //set to delay question number till when next question loads
          setTimeout(() => {
              questionNumber++
          }, 1000)
      }

      else if (option.checked && option.value !== currentQuestionAnswer) {
          const wrongLabelId = option.labels[0].id
         // document.getElementById(wrongLabelId).style.backgroundColor = "red"
         // document.getElementById(correctOption).style.backgroundColor = "green"
          wrongAttempt++
          indexNumber++
          //set to delay question number till when next question loads
          setTimeout(() => {
              questionNumber++
          }, 1000)
      }
  })
}



//called when the next button is called
function handleNextQuestion() {
  checkForAnswer()
  unCheckRadioButtons()
  //delays next question displaying for a second
  setTimeout(() => {
      if (indexNumber <= 9) {
          NextQuestion(indexNumber)
      }
      else {
          handleEndGame()
      }
      resetOptionBackground()
  }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
  const options = document.getElementsByName("option");
  options.forEach((option) => {
      document.getElementById(option.labels[0].id).style.backgroundColor = ""
  })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
  const options = document.getElementsByName("option");
  for (let i = 0; i < options.length; i++) {
      options[i].checked = false;
  }
}

// function for when all questions being answered
function handleEndGame() {
  let remark = null
  let remarkColor = null

  // condition check for player remark and remark color
  if (playerScore <= 0) {
    remark = "Hmm, something doesn't seem quite right about the quiz. Head to the 'Troubleshoot' page to learn more." 
    remarkColor = "orange"
}
else {
    remark = "Average Grades, You can do better."
    remarkColor = "orange"
}

const playerGrade = playerScore



  //data to display to score board
  document.getElementById('remarks').innerHTML = remark
  document.getElementById('remarks').style.color = remarkColor
  // document.getElementById('grade-percentage').innerHTML = playerGrade
  // document.getElementById('wrong-answers').innerHTML = wrongAttempt
  // document.getElementById('right-answers').innerHTML = playerScore
  document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
  questionNumber = 1
  playerScore = 0
  wrongAttempt = 0
  indexNumber = 0
  shuffledQuestions = []
  NextQuestion(indexNumber)
  document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
  document.getElementById('option-modal').style.display = "none"
}
