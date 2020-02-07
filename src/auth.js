var $landingPage = $('#landing_page')
var $mainPage = $('#main_page')
var $start = $('#start')
var $email = $('#email')

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token
  $.ajax({
    type: 'post',
    url: 'http://localhost:3000/g-sign',
    data: { id_token },
    success: function ({ token, email }) {
      localStorage.setItem('accessToken', token)
      localStorage.setItem('email', email)
      userLoggedIn()
    },
    error: function (err) {
      console.log(err)
    }
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('email')
    userLoggedOut()
  })
}

function userLoggedIn() {
  $landingPage.fadeOut(500, function () {
    $mainPage.show(500, function () {
      $email.text(`Welcome, ${localStorage.getItem('email')}`)
    })
  })
}

function userLoggedOut() {
  $mainPage.hide()
  $landingPage.show('fast')
}

function getScore() {
  $.ajax({
    type: "get",
    url: "http://localhost:3000/highest-score",
    headers: {
      token: localStorage.accessToken
    },
    success: function (response) {
      response.forEach((score, i) => {
        $('#score_board').append(
          `<tr>
      <th scope="row">${i + 1}</th>
      <td>${score.email}</td>
      <td>${!score.score && 0}</td>
      </tr>`
        );
      });
    },
    error: function (err) {
      console.log(err)
    }
  });
}

if (localStorage.getItem('accessToken')) {
  getScore()
  userLoggedIn()
} else {
  userLoggedOut()
}
