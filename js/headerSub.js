window.addEventListener("DOMContentLoaded", function () {
  const winHeight = $(window).innerHeight(); // 906
  const header = $("#headerArea");

  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    var scroll = window.scrollY || window.scrollTop;

    if (scroll < winHeight - 125) {
      header.addClass("hidden").removeClass("white");
    } else {
      scroll > lastScrollTop
        ? header.addClass("hidden").removeClass("white")
        : header.removeClass("hidden").addClass("white");
    }

    lastScrollTop = scroll;
  });
});
