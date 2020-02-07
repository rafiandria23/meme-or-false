function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        type: "post",
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
    });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('email')
        userLoggedOut()
    });
}

var $landingPage = $('#landing_page')
var $mainPage = $('#main_page')
var $start = $('#start')
var $quizPage = $('#quiz_page')
var $email = $('#email')
var $meme = $('#meme')
$meme.hide()

$start.on('click', function (e) {
    e.preventDefault()
    $mainPage.fadeOut(500, function () {
        $mainPage.hide()
        $quizPage.fadeIn(500, function () {
            $quizPage.show()
        })
    })
})

function userLoggedIn() {
    $landingPage.fadeOut(500, function () {
        $landingPage.hide()
        $quizPage.hide()
        $mainPage.fadeIn(500, function () {
            $mainPage.show()
            $email.text(`Welcome, ${localStorage.getItem('email')}`)
        })
    })
}

function userLoggedOut() {
    $mainPage.fadeOut(500, function () {
        $mainPage.hide()
        $quizPage.hide()
        $landingPage.fadeIn(500, function () {
            $landingPage.show()
        })
    })
}
if (localStorage.getItem('accessToken')) {
    userLoggedIn()
} else {
    userLoggedOut()
}
