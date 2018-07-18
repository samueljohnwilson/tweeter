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
        timePassed += Math.floor(elapsedTime / vals[i]) + " " + keys[i] + " ago";
        break;
      } else if (Math.floor(elapsedTime / vals[i] > 1)) {
        timePassed += Math.floor(elapsedTime / vals[i]) + " " + keys[i] + "s ago";
        break;
      }
    }

    let $section = $("<section>").addClass("tweets-container");
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

    $section.append($tweet)

    return $section.html();

  };

  function renderTweets(tweetArr) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    //let $tweet = createTweetElement(tweetData);

    for (let i = 0; i < tweetArr.length; i++) {
       let $tweet = createTweetElement(tweetArr[i]);
       $('#tweets-container').append($tweet)
       console.log($tweet)
    }

  };

  const data = [
    {
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
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  renderTweets(data);

});

