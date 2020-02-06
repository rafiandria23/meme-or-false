class Game {
  static startGame() {
    $.ajax({
      type: "POST",
      headers: {
        token: localStorage.accessToken
      },
      url: "http://localhost:3000/match",
      success: function (result) {
        localStorage.setItem('match_id', result.match_id)
        console.log(result, 'ini result')
      },
      error: function (err) {
        console.log(err);
      }
    });
  }

  static updateScore() {
    $.ajax({
      type: "PUT",
      headers: {
        token: localStorage.accessToken
      },
      data: {
        match_id: localStorage.match_id
      },
      url: "http://localhost:3000/match",
      success: function (result) {
        console.log(result, 'ini result')
      },
      error: function (err) {
        console.log(err);
      }
    });
  }

  static updateHighestScore() {
    $.ajax({
      type: "PATCH",
      headers: {
        token: localStorage.accessToken
      },
      data: {
        match_id: localStorage.match_id
      },
      url: "http://localhost:3000/match",
      success: function (result) {
        console.log(result, 'ini result')
      },
      error: function (err) {
        console.log(err);
      }
    });
  }


  static endGame() {
    $.ajax({
      type: "DELETE",
      headers: {
        token: localStorage.accessToken
      },
      data: {
        match_id: localStorage.match_id
      },
      url: "http://localhost:3000/match",
      success: function (result) {
        localStorage.removeItem('match_id')
        console.log(result, 'ini result')
      },
      error: function (err) {
        console.log(err);
      }
    });
  }


}
