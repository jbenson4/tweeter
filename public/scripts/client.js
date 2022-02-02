/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  const renderTweets = function(tweets) {
    tweets.forEach((data) => {
      const $tweet = createTweetElement(data);
      $('#tweets-container').append($tweet);
    });
  }

  const createTweetElement = function(tweetObj) {
  
    const timeSince = timeago.format(tweetObj.created_at);

    const $tweet = $(`
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

    return $tweet;
  }
  renderTweets(data);
});