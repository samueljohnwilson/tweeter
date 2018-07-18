/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(() => {

  function createTweetElement(obj) {

    const intervals = {
      year: (1000 * 24 * 60 * 60 * 365), 
      month: (1000 * 30 * 24 * 60 * 60), 
      week: (1000 * 7 * 24 * 60 * 60), 
      day: (1000 * 24 * 60 * 60), 
      hour: (1000 * 60 * 60), 
      minute: (1000 * 60)
    };

    let timePassed = "";
    const elapsedTime = Math.floor(Date.now() - obj.created_at);
    const keys = Object.keys(intervals);
    const vals = Object.values(intervals);

    for (let i = 0; i < keys.length; i++) {

      if ((elapsedTime / vals[keys.length - 1]) < 1) {
        timePassed = "Just now";
        break;
      }

      if (Math.floor(elapsedTime / vals[i] === 1)) {
        timePassed += Math.floor(elapsedTime / vals[i]) + " " + keys[i];
        break;
      } else if (Math.floor(elapsedTime / vals[i] > 1)) {
        timePassed += Math.floor(elapsedTime / vals[i]) + " " + keys[i] + "s";
        break;
      }
    }

    let $tweet = $("<article>").addClass("tweet");
    let $header = $("<header>").addClass("tweet-header");
    let $avatar = $("<img>").addClass("avatar");
    let $twitName = $("<h2>").addClass("twit-name");
    let $twitHandle = $("<p>").addClass("twit-handle");
    let $tweetText = $("<p>").addClass("tweet-text");
    let $tweetTime = $("<h5>").addClass("tweet-time");
    let $flag = $("<img>").addClass("icons");
    let $retweet = $("<img>").addClass("icons");
    let $heart = $("<img>").addClass("icons");
    let $footer = $("<footer>").addClass("tweet-footer");

    $avatar.attr("src", obj.user.avatars.small)
    $twitHandle.text(obj.user.handle);
    $twitName.text(obj.user.name)
    $tweetText.text(obj.content.text)
    $tweetTime.text(timePassed);
    $flag.attr("src", "/images/flag.png");
    $retweet.attr("src", "/images/retweet.png");
    $heart.attr("src", "/images/heart.png");

    $header.append($avatar, $twitHandle, $twitName)
    $footer.append($tweetTime, $heart, $retweet, $flag)

    $tweet.append($header, $tweetText, $footer);

    return $tweet.html();

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

  let $tweet = createTweetElement(tweetData);
 
  $('#tweets-container').append($tweet);

});

