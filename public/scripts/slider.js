 $(document).ready(() => {

  //Slides the text input up and down

  $(".compose").click(function(){
    $(".new-tweet").slideToggle();
    $("#text-input").focus();
  });

 });