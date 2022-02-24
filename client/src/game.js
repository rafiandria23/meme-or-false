class Game {
  static startGame() {
    $.ajax({
      type: 'POST',
      headers: {
        token: localStorage.accessToken
      },
      url: 'http://localhost:3000/match',
      success: function(result) {
        localStorage.setItem('match_id', result.match_id)
        console.log(result, 'start game')
      },
      error: function(err) {
        console.log(err)
      }
    })
  }

  // waktu user jawabannya benar
  static updateScore() {
    $.ajax({
      type: 'PUT',
      headers: {
        token: localStorage.accessToken
      },
      data: {
        match_id: localStorage.match_id
      },
      url: 'http://localhost:3000/match',
      success: function(result) {
        console.log(result, 'correct answer')
      },
      error: function(err) {
        console.log(err)
      }
    })
  }

  //   waktu selesai main
  static updateHighestScore() {
    $.ajax({
      type: 'PATCH',
      headers: {
        token: localStorage.accessToken
      },
      data: {
        match_id: localStorage.match_id
      },
      url: 'http://localhost:3000/match',
      success: function(result) {
        console.log(result, 'wrong answer')
      },
      error: function(err) {
        console.log(err)
      }
    })
  }

  //   selesai main hapus matchnya
  static endGame() {
    $.ajax({
      type: 'DELETE',
      headers: {
        token: localStorage.accessToken
      },
      data: {
        match_id: localStorage.match_id
      },
      url: 'http://localhost:3000/match',
      success: function(result) {
        localStorage.removeItem('match_id')
        console.log(result, 'selesai game')
      },
      error: function(err) {
        console.log(err)
      }
    })
  }
}
