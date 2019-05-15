function changeTime (time) {
  return new Date(time).toDateString();
}

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

  // Test / driver code (temporary). Eventually will get this from the server.
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

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.