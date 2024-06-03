window.addEventListener("DOMContentLoaded", function () {
  const videoBoxHeight = $(".videoBox").innerHeight();
  const header = $("#headerArea");

  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    var scroll = window.scrollY || window.scrollTop;

    if (scroll < videoBoxHeight - 125) {
      // .videoBox 안에 있을 때
      header.removeClass("white");
    } else {
      // .videoBox 벗어났을 때
      scroll > lastScrollTop
        ? header.addClass("hidden").removeClass("white")
        : header.removeClass("hidden").addClass("white");
    }

    lastScrollTop = scroll;
  });
});
