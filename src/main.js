function getQuestions() {
  let question;
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/trivia/",
    success: function (result) {
      let i = Math.floor(Math.random() * result.length);
      question = result[i].question;
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/yandex/",
        data: {
          question: question
        },
        success: function (response) {
          console.log(response);
          $("#question").html(response.result);
          // append ke target tag nya
        }
      });
    },
    error: function (err) {
      console.log(err);
    }
  });
}