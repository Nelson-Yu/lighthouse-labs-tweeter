$(function () {

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

//Loop through each object in the array and apply the creattTweetElement function
//Then appen the created tweet element to the tweets-container id in the HTML
  function renderTweets(tweets) {
    for (key of tweets) {
      let eachTweet = createTweetElement(key);
      $("#tweets-container").append(eachTweet);
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

  renderTweets(data);
});