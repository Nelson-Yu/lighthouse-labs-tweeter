$(document).ready(function () {

//Loop through each object in the array and apply the creattTweetElement function
//Then appen the created tweet element to the tweets-container id in the HTML
  function renderTweets(tweets) {
    for (key of tweets) {
      let eachTweet = createTweetElement(key);
      $("#tweets-container").prepend(eachTweet);
    }
  }

//Added a change time function to convert the unix time of 'created_at'
  function changeTime (time) {
    return new Date(time).toDateString();
  }

//Each let declaration starting at $tweet appends each component to the $tweet
//When returned we will get the whole <article class="tweet">
  function createTweetElement(tweet) {
    let user = tweet.user;
    let text = tweet.content.text;
    let date = tweet.created_at;

    let $tweet = $("<article>").addClass("tweet");

    let $header = $("<header>").addClass("profile-header");
    ($tweet).append($header);

    let $userPic = $("<img>").addClass("profile-pic");
    $userPic.attr("src", user.avatars.small);
    $header.append($userPic);

    let $userName = $("<h2>").addClass("profile-name");
    $userName.append(user.name);
    $header.append($userName);

    let $userHandle = $("<p>").addClass("profile-handle");
    $userHandle.append(user.handle);
    $header.append($userHandle);

    let $content = $("<p>").addClass("tweet-body");
    $content.append(text);
    $tweet.append($content);

    let $footer = $("<footer>").addClass("tweet-footer");
    $tweet.append($footer);

    let $tweetTime = $("<p>").addClass("tweet-time");
    $tweetTime.append(changeTime(date));
    $footer.append($tweetTime);

    return $tweet;
  }

// This function checks the validity of the tweet by looking at whether an empty string or a tweet with over 140 characters is submitted
  function validTweet() {
    const text = $("#tweet-content").val().length;

    if (text === 0) {
      alert("Please write a tweet!");
      return false;
    } else if (text > 140) {
      alert("Please keep your tweet 140 characters or less!")
      return false;
    }

    return true;
  }

// This function uses ajax to POST a new tweet to the /tweets, when the process is done it runs the loadTweets() which renders all the tweets from /tweets
  function submitTweet(event) {
    event.preventDefault();
    if (validTweet()) {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize()
      }).done(() => {
          loadTweets();
        });
    }
  }

//This function gets the JSON of the data from /tweets, then with the JSON data renderTweers() is used to display the tweets in the main container
  function loadTweets() {
    $.getJSON("/tweets").done((data) => {
      renderTweets(data);
    });
  }

//This is an event handler that triggers the submitTweet() when the "tweet" submit button is pressed on localhost:8080/
  $("#submit-form").submit(submitTweet);

//Calls the loadTweets() to display the currently stored tweets from /tweets
  loadTweets();
});
