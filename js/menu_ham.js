$(document).ready(function () {
  var onoff = false; // true(open), false(close)

  $(".menuOpen").click(function (e) {
    e.preventDefault();

    if (onoff == false) {
      // 메뉴가 닫혀있다면
      $("#gnb").slideDown("fast");
      $("#headerArea h1 a").addClass("mn_open");
      $(".menu_ham").addClass("mn_open");
      onoff = true;
    } else {
      $("#gnb").slideUp(100);
      $("#headerArea h1 a").removeClass("mn_open");
      $(".menu_ham").removeClass("mn_open");
      onoff = false;
    }
  });

  //  네비높이 맞추기(페이지 로딩시 1회)
  var screenSize = $(window).width();
  var winh = $(document).height();

  if (screenSize > 768) {
    $("#gnb").height("auto");
  } else {
    $("#gnb").height(winh);
  }

  var current = 0; // 0(해상도가 모바일), 1(소형테블릿이상)

  $(window).resize(function () {
    var screenSize = $(window).width();
    if (screenSize > 768) {
      $("#gnb").show();
      $("#gnb").height("auto");
      current = 1; //소형테블릿이상
    }
    if (current == 1 && screenSize <= 768) {
      $("#gnb").hide();
      $("#gnb").height(winh);
      onoff = false;
      current = 0; //모바일
    }
  });
});
