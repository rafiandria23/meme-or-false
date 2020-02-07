// Ini rencananya udah sama translate yandexnya
// function getQuestions() {
//   let question;
//   $.ajax({
//     type: "GET",
//     url: "http://localhost:3000/trivia/",
//     success: function (result) {
//       let i = Math.floor(Math.random() * result.length);
//       question = result[i].question;
//       $.ajax({
//         type: "POST",
//         url: "http://localhost:3000/yandex/",
//         data: {
//           question: question
//         },
//         success: function (response) {
//           console.log(response);
//           $("#question").html(response.result);
//           // append ke target tag nya
//         }
//       });
//     },
//     error: function (err) {
//       console.log(err);
//     }
//   });
// }

let showQuestion = $('#trivia')
function getQuestion() {
  showQuestion.empty()
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/trivia`,
    success: function (response) {
      let i = Math.floor(Math.random() * 10)
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

function checkAnswer(userAnswer, correctAnswer = "True") {
  correctAnswer = correctAnswer == 'True' ? true : false
  if (userAnswer == correctAnswer) {
    console.log('benar')
    console.log(userAnswer, correctAnswer)
    showMeme()
  } else {
    console.log('salah')
    console.log(userAnswer, correctAnswer)
    // getQuestion()
  }
}

function showMeme() {
  $('#meme').show();
  $('#quiz_page').hide();
  setTimeout(() => {
    $('#meme').hide();
    $('#quiz_page').show();
  }, 2000);
}