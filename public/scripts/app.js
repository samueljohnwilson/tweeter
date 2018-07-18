/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(() => {

  function createTweetElement(obj) {

    let timePassed = "";
    let elapsedTime = Math.floor((Date.now() - obj.created_at)/(1000 * 24 * 60 * 60 * 365));
    if (elapsedTime % (365 * 24 * 60 * 60) > 0) {
      timePassed += elapsedTime + " years ago";
    } else if (elapsedTime % (30 * 24 * 60 * 60) > 0) {
      timePassed += elapsedTime + " months ago";
    } else if (elapsedTime % (7 * 24 * 60 * 60) > 0) {
      timePassed += elapsedTime + " weeks ago";
    } else if (elapsedTime % (24 * 60  * 60) > 0) {
      timePassed += elapsedTime + " days ago";
    } else if (elapsedTime % (60 * 60) > 0) {
      timePassed += elapsedTime + " hours ago";
    } else if (elapsedTime % (60 * 60) > 0) {
    timePassed += elapsedTime + " hours ago";
    } else if (elapsedTime % 60 > 0) {
      timePassed += elapsedTime + " minutes ago";
    } else {
      timePassed = "Just now";
    }

    $(".avatar").attr("src", obj.user.avatars.small);
    $(".twit-handle").text(obj.user.handle);
    $(".twit-name").text(obj.user.name)
    $(".tweet-text").text(obj.content.text)
    $(".tweet-time").text(timePassed);

  };

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  var $tweet = createTweetElement(tweetData);

  $('#tweets-container').append($tweet);

});

      // <section class="tweet-display">
      //   <article>
      //     <header class="tweet-header">
      //       <img class="avatar" src="/images/bird.png"></img>
      //       <h2 class="twit-name"> Tweeter Name</h2>
      //       <p class="twit-handle">@Twit</p>
      //     </header>
      //     <p class="tweet-text">Here's a tweet</p>
      //     <footer class="tweet-footer">
      //       <h5 class="tweet-time">8 days ago</h1>
      //       <img class="icons" src="/images/flag.png">
      //       <img class="icons" src="/images/retweet.png">
      //       <img class="icons" src="/images/heart.png">
      //     </footer>
      //   </article>
      // </section>
