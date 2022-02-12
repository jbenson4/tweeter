$(document).ready(function() {
  // Hide error container on page load
  $('.submit-error').slideUp(1);
  // Hide new tweet form on page load
  $('form').slideUp(1);

  const createTweetElement = function(tweetObj) {
  
    const timeSince = timeago.format(tweetObj.created_at);

    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    
    const $tweetElements = $(`
    <article class="tweets-container">
      <header class="tweet-header">
        <div id="avatar-and-name">
        <img id="avatar" src="${escape(tweetObj.user.avatars)}" />
        <p id="tweet-name">${escape(tweetObj.user.name)}</p>
        </div>
        <p id="handle">${escape(tweetObj.user.handle)}</p>
      </header>
        <p id="tweet">${escape(tweetObj.content.text)}</p>
        <div class="tweet-underline"></div>
      <footer class="tweet-footer">
        <p>${escape(timeSince)}</p>
        <div id="links">
          <i class="fas fa-flag link"></i>
          <i class="fas fa-retweet link"></i>
          <i class="fas fa-heart link"></i>
        </div>
      </footer>
    </article>
    `);
    return $tweetElements;
  };
  
  // GET request page render
  const renderTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
    }).then((data) => {
      $('#tweets-container').empty();
      data.forEach((tweet) => {
        const $tweet = createTweetElement(tweet);
        $('#tweets-container').prepend($tweet);
      });
    });
  };

  // Initial page render function call
  renderTweets();

  // Tweet submission eventListeners
  $('#submit-tweet').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const tweetLength = data.substring(5).length;

    if (tweetLength === 0) {
      const error = $('#error-message');
      error.text('Too short. Plz tweet something before submitting. #kthxbye.');
      $('.submit-error').slideDown(500);
      return;
    }
    if (tweetLength > 140) {
      const error = $('#error-message');
      error.text('Too long. Plz rspct our arbitrary limit of 140 chars. #kthxbye.');
      $('.submit-error').slideDown(500);
      return;
    }
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data,
    }).then(() => {
      renderTweets();
      $('.submit-error').slideUp(500);
      $('form').trigger('reset');
      $('.counter').val('140');
    });
  });
  
  // Form sliding eventListener
  $('.nav-tweet').on('click', (event) => {
    if ($('form').is(':visible')) {
      return $('form').slideUp(400);
    }
    $('form').slideDown(400);
    $('#tweet-text').focus();
  });
  
});