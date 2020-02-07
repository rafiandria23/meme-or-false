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
    success: function({ token, email }) {
      localStorage.setItem('accessToken', token)
      localStorage.setItem('email', email)
      userLoggedIn()
    },
    error: function(err) {
      console.log(err)
    }
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('email')
    userLoggedOut()
  })
}

function userLoggedIn() {
  $landingPage.fadeOut(500, function() {
    $mainPage.show(500, function() {
      $email.text(`Welcome, ${localStorage.getItem('email')}`)
    })
  })
}

function userLoggedOut() {
  $mainPage.hide()
  $landingPage.show('fast')
}

if (localStorage.getItem('accessToken')) {
  userLoggedIn()
} else {
  userLoggedOut()
}
