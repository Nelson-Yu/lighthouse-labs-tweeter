$(document).ready(function () {

//Loop through each object in the array and apply the creattTweetElement function
//Then prepend the created tweet element to the tweets-container id in the HTML, prepending allows for the most recent tweet to show at the top
  function renderTweets(tweets) {
    for (key of tweets) {
      let eachTweet = createTweetElement(key);
      $("#tweets-container").prepend(eachTweet);
    }
  }

//Each let declaration starting at $tweet appends each component to the $tweet
//When returned we will get the whole <article class="tweet"> and all it's children
//Uses moment to change the unix time givne to a relative time (i.e. 5 days ago or 3 years ago)
  function createTweetElement(tweet) {
    let user = tweet.user;
    let text = tweet.content.text;
    let date = moment(tweet.created_at);

    let $tweet = $("<article>").addClass("tweet");

    let $header = $("<header>").addClass("profile-header");
    $tweet.append($header);

    let $userPic = $("<img>").addClass("profile-pic");
    $userPic.attr("src", user.avatars.small);
    $header.append($userPic);

    let $userName = $("<h2>").addClass("profile-name");
    $userName.append(user.name);
    $header.append($userName);

    let $userHandle = $("<p>").addClass("profile-handle");
    $userHandle.append(user.handle);
    $header.append($userHandle);

    let $div = $("<div>").addClass("text-container");
    $tweet.append($div);

    let $content = $("<p>").addClass("tweet-body");
    $content.append(text);
    $div.append($content);

    let $footer = $("<footer>").addClass("tweet-footer");
    $tweet.append($footer);

    let $tweetTime = $("<p>").addClass("tweet-time");
    $tweetTime.append(date.fromNow());
    $footer.append($tweetTime);

    let $icons = $("<div>").addClass("tweet-icons");
    $icons.append($("<i>").addClass("fa fa-flag"));
    $icons.append($("<i>").addClass("fa fa-retweet"));
    $icons.append($("<i>").addClass("fa fa-heart"));
    $footer.append($icons);

    return $tweet;
  }

// This function checks the validity of the tweet by looking at whether an empty string or a tweet with over 140 characters is submitted
  function validTweet() {
    const text = $("#tweet-content").val().length;
    const errorElement = $(".validate");

    if (text === 0) {
      errorElement.addClass("text-error");
      errorElement.text("Please write a tweet! 😡");
      $(".text-error").slideDown();
      return false;
    } else if (text > 140) {
      errorElement.addClass("text-error");
      errorElement.text("140 characters or less! 😡")
      $(".text-error").slideDown();
      return false;
    }

    $(".text-error").slideUp()
    return true;
  }

// This function uses ajax to POST a new tweet to the /tweets, when the process is done it runs the loadTweets() which renders all the tweets from /tweets
// The tweets-container is emptied prior to the loadTweets() so that the old tweets aren't loaded twice
  function submitTweet(event) {
    event.preventDefault();

    if (validTweet()) {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize()
      }).done(() => {
          $("#tweets-container").empty();
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

//This function uses slidetoggle() to toggle the submission form, it also uses focus() to autoselect textarea
  function toggleForm() {
    $(".new-tweet").slideToggle();
    $("#tweet-content").focus();
  }

//This function checks to see if the window is top if not then display button
  function displayTop() {
    if ($(this).scrollTop() > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  }

//This function allows for a "return to top" action when called
  function returnToTop() {
    $("html, body").animate({scrollTop : 0}, 300);
    return false;
  }

//This is an event handler that displays the "Top" button when the window is not top
  $(window).scroll(displayTop);

//This is an event handler where when they scroll to top button is clicked, the window will scroll back to the top
  $(".scroll-to-top").on("click", returnToTop);


//This is an event handler where when the compose button is clicked the .new-tweet box is toggled to slide
  $(".compose").on("click", toggleForm);

//This is an event handler that triggers the submitTweet() when the "tweet" submit button is pressed on localhost:8080/
  $("#submit-form").submit(submitTweet);

//Calls the loadTweets() to display the currently stored tweets from /tweets
  loadTweets();
});
