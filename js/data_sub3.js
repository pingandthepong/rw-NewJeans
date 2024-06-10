document.addEventListener("DOMContentLoaded", function () {
  setupMenu();
  tabletMenu();
});

window.addEventListener("resize", function () {
  tabletMenu();
});

// TODO
$(document).ready(function () {
  $(window).on("scroll", function () {
    const ht = $(window).height();
    // 현재 문서가 스크롤된 거리 저장
    const scroll = $(window).scrollTop();

    // 메뉴 활성화
    for (let i = 0; i < 3; i++) {
      if (scroll >= ht * i && scroll < ht * (i + 1)) {
        $("#menu li").removeClass("on");
        $("#menu li").eq(i).addClass("on");
      }
    }
  });
});

// #menu 클릭시 자동 상하 스크롤 및 활성화 클래스 관리
function setupMenu() {
  const menuItems = document.querySelectorAll("#menu li");
  const sections = document.querySelectorAll("section");

  menuItems.forEach(function (menuItem, menuIdx) {
    // #menu li animation delay
    setTimeout(function () {
      menuItem.classList.add("ani");
    }, 200 * menuIdx);

    // #menu 클릭시
    menuItem.addEventListener("click", function (e) {
      e.preventDefault();

      // 해당 메뉴 스타일 활성화
      menuItems.forEach((item) => {
        item.classList.remove("on");
      });
      menuItem.classList.add("on");

      // 해당 메뉴로 이동
      const rect = sections[menuIdx].getBoundingClientRect();
      const nowTop = rect.top + window.pageYOffset - 50;

      const start = window.pageYOffset;
      const distance = nowTop - start;
      const duration = 400;
      const frameRate = 1000 / 60; // 60 FPS
      const totalFrames = duration / frameRate;
      let frame = 0;

      const interval = setInterval(function () {
        frame++;
        const progress = frame / totalFrames;
        window.scrollTo(0, start + distance * progress);

        if (frame >= totalFrames) {
          clearInterval(interval);
        }
      }, frameRate);
    });
  });
}

// 태블릿(768) 이하에서 textContent 변경
function tabletMenu() {
  const winW = window.innerWidth;
  const menuLists = document.querySelectorAll("#menu li a");

  menuLists.forEach((menuList, idx) => {
    if (winW <= 768) {
      if (!menuList.dataset.originalText) {
        menuList.dataset.originalText = menuList.textContent; // 원리 텍스트 저장
      }
      menuList.textContent = `${idx + 1}`;
      menuList.style.fontSize = "1.5rem";
    } else {
      if (menuList.dataset.originalText) {
        menuList.textContent = menuList.dataset.originalText; // 원래 텍스트 복원
        menuList.style.fontSize = "";
      }
    }
  });
}

// ==============================
// .badge_title
const badgeTitles = document.querySelectorAll(".badge_title a");

badgeTitles.forEach(function (badgeTitle) {
  const spanTitle = document.createElement("span");
  spanTitle.classList.add("spanTitle");
  badgeTitle.appendChild(spanTitle);
  spanTitle.textContent = "TITLE";
});

// .badge_hit
const badgeHits = document.querySelectorAll(".badge_hit a");

badgeHits.forEach(function (badgeHit) {
  const spanHit = document.createElement("span");
  spanHit.classList.add("spanHit");
  badgeHit.appendChild(spanHit);
  spanHit.textContent = "HIT";
});
