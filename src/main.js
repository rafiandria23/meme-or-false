var $mainPage = $('#main_page')
var $start = $('#start')
var $quizPage = $('#quiz_page')
var $meme = $('#meme')

// Button start buat mulai game
$start.on('click', function(e) {
  e.preventDefault()
  $mainPage.fadeOut(500, function() {
    $mainPage.hide()
    getQuestion()
    Game.startGame()
    $quizPage.fadeIn(500, function() {
      showQuestion()
    })
  })
})

function getQuestion() {
  $quizPage.empty()
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/trivia`,
    headers: {
      token: localStorage.accessToken
    },
    success: function(questions) {
      let i = Math.floor(Math.random() * 10)
      let randomQuestion = questions[i]
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/yandex/',
        headers: {
          token: localStorage.accessToken
        },
        data: {
          question: randomQuestion.question
        },
        headers: {
          token: localStorage.accessToken
        },
        success: function(response) {
          randomQuestion.question = response.result
          console.log(randomQuestion)
          $quizPage.append(templateQuestion(randomQuestion))
        },
        error: function(err) {
          console.log(err)
        }
      })
      showQuestion()
    },
    error: function(err) {
      console.log(err)
    }
  })
}

function showQuestion() {
  $quizPage.fadeIn(500)
}

function templateQuestion(question) {
  let template = `
      <div class="hero__overlay" style="background-color: blue;"></div>
      <div class="hero__mask"></div>
      <div class="hero__inner">
        <div class="container">
          <div class="hero__content">
            <div class="card" style="width: 50em; padding-bottom: 2em; background-color: rgba(3, 0, 0, 0.418);">
              <div class="container text-center">
                <h2 class="text-center text-white">Question</h2>
                <p class="card-subtitle mb-2 text-white" style="font-size: 24px;">
                  ${question.question}
                </p>
                <button class="button button__accent" id="true" onclick="checkAnswer(true, '${question.correct_answer}')">Benar</button>
                <button class="button button__delete" id="false" onclick="checkAnswer(false, '${question.correct_answer}')">Salah</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      `

  return template
}

function checkAnswer(userAnswer, correctAnswer) {
  correctAnswer = correctAnswer == 'True' ? true : false
  if (userAnswer == correctAnswer) {
    // kalo bener tampilin meme nya
    Meme.getMeme()
    $quizPage.fadeOut(500, function() {
      $quizPage.hide()
      Game.updateScore()
      $meme.fadeIn(500, function() {
        $meme.fadeIn(500)
      })
    })
  } else {
    // console.log('salah')
    // console.log(userAnswer, correctAnswer)
    Game.updateHighestScore()
    Game.endGame()
    $quizPage.fadeOut(500, function() {
      $quizPage.hide()
      $mainPage.show(500, function() {
        $email.text(`Welcome, ${localStorage.getItem('email')}`)
      })
    })
  }
}
