let showQuestion = $('#trivia')
function getQuestion() {
  showQuestion.empty()
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/trivia`,
    success: function (response) {
      // console.log(response[1])
      let i = Math.floor(Math.random() * 10)
      showQuestion.append(showTemplate(response[i]))
    }
  })
}

getQuestion()

function showTemplate(question) {

  let template = `
  <div class="card" style="width: 50rem;>
      <div class="card-body">
        <h5 class="card-title">Question #1</h5>
        <div class="putQuestion">
          <p class="card-text" id="question">${question.question}</p>
        </div>
        <input class="btn btn-primary" type="button" value="True" onclick="cekJawaban(true, '${question.correct_answer}')">
          <input class="btn btn-primary" type="button" value="False" onclick="cekJawaban(false, '${question.correct_answer}')">
        </div>
      </div>`

  return template
}

function cekJawaban(answer, correct) {
  // console.log(answer, correct)
  correct = correct == 'True' ? true : false;
  if (answer == correct) {
    console.log('benar')
    console.log(answer, correct)
  } else {
    console.log('salah')
    console.log(answer, correct)
    getQuestion()
  }
}