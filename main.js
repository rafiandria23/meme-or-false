let showQuestion = $('#trivia')
function getQuestion() {
  showQuestion.empty()
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/trivia`,
    success: function (response) {
      let i = Math.floor(Math.random() * 10)
      showQuestion.append(templateQuestion(response[i]))
    }
  })
}

getQuestion()

function templateQuestion(question) {

  let template = `
      <div class="card" style="width: 50rem;>
        <div class="card-body">
        <h5 class="card-title">Question #1</h5>
        <div class="putQuestion">
          <p class="card-text" id="question">${question.question}</p>
        </div>
        <input class="btn btn-primary" type="button" value="True" onclick="checkAnswer(true, '${question.correct_answer}')">
          <input class="btn btn-primary" type="button" value="False" onclick="checkAnswer(false, '${question.correct_answer}')">
        </div>
      </div>`

  return template
}

function checkAnswer(userAnswer, correctAnswer) {
  correctAnswer = correctAnswer == 'True' ? true : false;
  if (userAnswer == correctAnswer) {
    console.log('benar')
    console.log(userAnswer, correctAnswer)
  } else {
    console.log('salah')
    console.log(userAnswer, correctAnswer)
    getQuestion()
  }
}