// This function is used to change the text counter within the new-text box at the bottom right
// We select the tag textarea within the class new-tweet, the event handler is the 'keyup' event
// 'this' is used to refer to the element on which the event triggered
// $(this).siblings(".counter") looks within the counter class such that we can change the colour and number of the counter
// No arrow functions are used due to the conflicts with 'this'

$(document).ready(function () {

  $(".new-tweet textarea").on("keyup", function () {

    const counter = 140 - $(this).val().length;
    const text = $(this).siblings(".counter");

    if (counter < 0) {
      text.css("color", "red");
    } else {
      text.css("color", "white");
    }

    text.text(counter);
  });
});