$(document).ready(() => {

  $("textarea").on("keyup", function(event) {
    let counter = $(this).closest("section").find("span");
    let currentLength = $(this).val().length

    counter.text(140 - currentLength);

    if (140 - currentLength < 0) {
      counter.toggleClass("negative-counter", true);
    } else if (140 - currentLength >= 0) {
      counter.toggleClass("negative-counter", false);
    }

  });

});

