/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(() => {

    function timeSince(obj) {

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
          return timePassed = "Just now";
        }

        if (Math.floor(elapsedTime / vals[i] === 1)) {
          return timePassed += Math.floor(elapsedTime / vals[i]) + " " + keys[i] + " ago";
          
        } else if (Math.floor(elapsedTime / vals[i] > 1)) {
          return timePassed += Math.floor(elapsedTime / vals[i]) + " " + keys[i] + "s ago";
        }
      }
    }

  const data = [];

  function createTweetElement(obj) {

    let timePassed = timeSince(obj);

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

    if (tweetArr.length === 1) {
      let $tweet = createTweetElement(tweetArr[0]);
      $('#tweets-container').prepend($tweet)

    } else {

      for (let i = 0; i < tweetArr.length; i++) {
       let $tweet = createTweetElement(tweetArr[i]);
       $('#tweets-container').append($tweet)
      }
    }
  };

  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function(tweetJSON) {
      renderTweets(tweetJSON.reverse())
    })
  }

  function newTweet() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function(tweetJSON) {
      let newTweets = [];
      newTweets.push(tweetJSON[tweetJSON.length - 1])
      renderTweets(newTweets);
    })
  }

  $("#empty-tweet").hide();
  $("#too-long").hide();

  $('form').on('submit', function(event) {
    event.preventDefault();
    if ($("form textarea").val() === "") {
      $("#empty-tweet").slideDown();
      $("#too-long").slideUp();
      return;
    } else if ($("form textarea").val().length > 140){
      $("#too-long").slideDown();
      $("#empty-tweet").slideUp();
      return;
    } else {
      $("#empty-tweet").slideUp();
      $("#too-long").slideUp();
    }

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $('form').serialize()
    })
    .then(function(tweet) {
      data.push(tweet);
      newTweet();
      $("#text-input").val("");
      $(".counter").text(140);
    })
  });

loadTweets();

});

