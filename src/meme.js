class Meme {
  static getMeme() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3000/memes',
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
           <div class="d-flex justify-content-center">
              <h2 class="d-flex">Coba coba</h2>
            </div>
        `
        $('#meme-vid').append(content)
      },
      error: function(err) {
        console.log(err)
      }
    })
  }
}
