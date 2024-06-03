$(document).ready(function () {
  var screenSize, screenHeight;
  var current = false;

  function screen_size() {
    screenSize = $(window).width();
    screenHeight = $(window).height();

    if (screenSize > 768 && current == false) {
      $("#videoBG").show();
      $("#videoBG").attr("src", "./images/mainimages/visual/back.mp4");
      $("#imgBG").hide();

      current = true;
    }
    if (screenSize <= 768) {
      $("#videoBG").hide();
      $("#videoBG").attr("src", "");
      $("#imgBG").show();
      $(".down").addClass(".fix");
      current = false;
    }
  }

  //최초 실행시 호출
  screen_size();

  $(window).resize(function () {
    screen_size();
  });

  // .down 클릭 이벤트 핸들러
  $(".down").click(function (e) {
    e.preventDefault();
    screenHeight = $(window).height();
    $("html,body").animate({ scrollTop: screenHeight }, 500);
  });
});
