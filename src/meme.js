class Meme {
  static getMeme() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/memes/',
      success: function(meme) {
        $('#meme-vid').empty()
        let content = `
          <figure class="d-flex justify-content-center">
            <video height="500" width="500" autoplay loop class="d-flex">
              <source
                src="${meme}"
                type="video/mp4"
              />
              Your browser does not support HTML5 video.
            </video>
          </figure>
           <div class="flex-column justify-content-center">
              <h2 class="text-center text-white font-weight-bold">Yeaay! Jawabanmu benar</h2>
              <button class="button button__accent" onclick="Meme.mainLagi(event)">Main Lagi</button>
            </div>
        `
        $('#meme-vid').append(content)
      },
      error: function(err) {
        console.log(err)
      }
    })
  }

  static mainLagi(event) {
    event.preventDefault()
    $('#meme').fadeOut(500, function() {
      $('#meme').hide()
      $('#meme-vid').empty()
      getQuestion()
      $('#quiz_page').fadeIn(500, function() {
        showQuestion()
      })
    })
  }
}
