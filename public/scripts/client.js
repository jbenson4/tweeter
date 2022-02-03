$(document).ready(function() {
  
  $('.submit-error').slideUp(1);

   const createTweetElement = function(tweetObj) {
  
    const timeSince = timeago.format(tweetObj.created_at);

    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
    
    const $tweetElements = $(`
    <article class="tweets-container">
      <header class="tweet-header">
        <div id="avatar-and-name">
        <img src="${escape(tweetObj.user.avatars)}" />
        <p id="name">${escape(tweetObj.user.name)}</p>
        </div>
        <p id="handle">${escape(tweetObj.user.handle)}</p>
      </header>
        <p id="tweet">${escape(tweetObj.content.text)}</p>
        <div class="tweet-underline"></div>
      <footer class="tweet-footer">
        <p>${escape(timeSince)}</p>
        <div id="links">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
    `);

    return $tweetElements;
  }

  const renderTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET', 
    }).then((data) => {
      $('#tweets-container').empty();
      data.forEach((tweet) => {
        const $tweet = createTweetElement(tweet);
        $('#tweets-container').prepend($tweet);
      })
    });
  }

  renderTweets();

  $('#submit-tweet').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const tweetLength = data.substring(5).length;

    if (tweetLength === 0) {
      const error = $('#error-message');
      error.text('Too short. Plz tweet something before submitting. #kthxbye.');
      $('.submit-error').slideDown(500);
      // error.addClass('error-true');
      // return alert("You've submitted an empty string!");
    }
    if (tweetLength > 140) {
      const error = $('#error-message');
      error.text('Too long. Plz rspct our arbitrary limit of 140 chars. #kthxbye.');
      $('.submit-error').slideDown(500);
      // return alert("Your tweet is too long!");
    }
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data,
    }).then(() => {
      renderTweets();
      $('form').trigger('reset');
    })
  });
  
});