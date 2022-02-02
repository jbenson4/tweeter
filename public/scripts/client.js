$(document).ready(function() {
  
   const createTweetElement = function(tweetObj) {
  
    const timeSince = timeago.format(tweetObj.created_at);

    const $tweetElements = $(`
    <article class="tweets-container">
      <header class="tweet-header">
        <div id="avatar-and-name">
        <img src="${tweetObj.user.avatars}" />
        <p id="name">${tweetObj.user.name}</p>
        </div>
        <p id="handle">${tweetObj.user.handle}</p>
      </header>
        <p id="tweet">${tweetObj.content.text}</p>
        <div class="tweet-underline"></div>
      <footer class="tweet-footer">
        <p>${timeSince}</p>
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
        $('#tweets-container').append($tweet);
      })
    });
  }

  renderTweets();

  $('#submit-tweet').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const tweetLength = data.substring(5).length;
    if (tweetLength === 0) {
      return alert("You've submitted an empty string!");
    }
    if (tweetLength > 140) {
      return alert("Your tweet is too long!");
    }
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data,
    }).then(() => {
      renderTweets();
    })
  });
  
});