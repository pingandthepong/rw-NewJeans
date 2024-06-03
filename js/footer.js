window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY || this.window.pageYOffset;

  const widePcMediaQuery = window.matchMedia("(min-width: 1281px)");
  const regularPcMediaQuery = window.matchMedia(
    "(min-width: 641px) and (max-width: 1280px)"
  );
  const mobileMediaQuery = window.matchMedia("(max-width: 640px)");

  // 와이드pc scrollPosition = 10000
  // 일반pc scrollPosition = 9889.5
  // 모바일pc scrollPosition = 8873

  let scrollThreshold;

  if (widePcMediaQuery.matches) {
    // 와이드 PC 일 때의 스크롤 임계값
    scrollThreshold = 10300;
  } else if (regularPcMediaQuery.matches) {
    // 일반 PC 일 때의 스크롤 임계값
    scrollThreshold = 10000;
  } else if (mobileMediaQuery.matches) {
    scrollThreshold = 7000;
  }

  // console.log("Scroll position:", scrollPosition);
  // console.log("Scroll threshold:", scrollThreshold);

  const logoFooter = document.querySelector(".logo_footer");

  const logoFooterSlices = logoFooter.textContent.split(""); // 문자 배열

  if (scrollPosition > scrollThreshold) {
    // 기존 텍스트를 비우고 fLogoSlices 각 문자를 span으로 감쌈
    logoFooter.innerHTML = "";

    logoFooterSlices.forEach((fLogoSlice, fLogoInd) => {
      const span = document.createElement("span");
      span.textContent = fLogoSlice;
      logoFooter.appendChild(span);

      setTimeout(function () {
        span.classList.add("slideUp");
      }, (fLogoInd + 1) * 200);
    });
  }
});

// ====================================
// move_top
var lastScrollTopFooter = 0;
var moveTopVisible = false;

function moveTop() {
  var scroll = $(window).scrollTop();

  if (scroll > lastScrollTopFooter && scroll > 500 && !moveTopVisible) {
    $(".move_top").stop().animate({ opacity: 1 }, 100);
    moveTopVisible = true;
  } else if (scroll <= 500 && moveTopVisible) {
    $(".move_top").stop().animate({ opacity: 0 }, 100);
    moveTopVisible = false;
  }

  lastScrollTopFooter = scroll;
}

$(window).on("scroll", function () {
  requestAnimationFrame(moveTop);
});

$(".move_top").click(function (e) {
  e.preventDefault();
  $("html,body").stop().animate({ scrollTop: 0 }, 500);
});
