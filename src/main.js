class Play {
  static getQuestions() {
    $('#trivia').empty()
    $.ajax({
      type: "GET",
      headers: {
        token: localStorage.accessToken
      },
      url: "http://localhost:3000/trivia/",
      success: function (result) {
        console.log(result, '<<<<<')
        let i = Math.floor(Math.random() * result.length);
        let trivia = result[i]

        Play.translateQuestion(trivia)

      },
      error: function (err) {
        console.log(err);
      }
    });
  }

  static translateQuestion(trivia) {
    $.ajax({
      type: "POST",
      headers: {
        token: localStorage.accessToken
      },
      url: "http://localhost:3000/yandex/",
      data: {
        question: trivia.question,
      },
      success: function (question) {
        $('#trivia').append(Play.templateQuestion(question.result, trivia.correct_answer))
      }
    });
  }

  static templateQuestion(question, answer) {
    let template = `
          < div class="container" >
            <div class="hero__content">
              <div class="card" style="width: 50em; padding-bottom: 2em;">
                <div class="container">
                <h2>Question #1</h2>
                <p class="card-subtitle mb-2 text-muted" style="font-size: 24px;">
                  ${question}
                </p>
                <input class="button button__accent" type="button" value="True" onclick="Play.checkAnswer(true, '${answer}')">
                <input class="button button__delete" type="button" value="False" onclick="Play.checkAnswer(false, '${answer}')"></input>
                </div>
              </div>
            </div>
          </div >`

    return template
  }

  static checkAnswer(userAnswer, correctAnswer) {
    correctAnswer = correctAnswer == 'True' ? true : false
    if (userAnswer == correctAnswer) {
      Game.updateScore()
      console.log('benar')
      console.log(userAnswer, correctAnswer)
    } else {
      Game.updateHighestScore()
      console.log('salah')
      console.log(userAnswer, correctAnswer)
      Game.endGame()
      // Play.getQuestions()
    }
  }


}