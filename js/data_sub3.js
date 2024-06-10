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

// ==============================
// music player
const playBtns = document.querySelectorAll(".playBtn");
const backwards = document.querySelectorAll(".backward");
const forwards = document.querySelectorAll(".forward");
const audioEls = document.querySelectorAll(".new_audio");

let status = false; // false(정지상태), true(재생중)
let ctx, analyzer, animationId;

// 초기 상태 설정
window.addEventListener("DOMContentLoaded", (event) => {
  createVisualizerBars();
  setPlayButton();
});

function createVisualizerBars() {
  const visualizerContainers = document.querySelectorAll(
    ".visualizer-container"
  );

  visualizerContainers.forEach(function (visualizerContainer) {
    visualizerContainer.innerHTML = ""; // 기존 바 제거 후 새로 추가
    for (let i = 0; i < 30; i++) {
      // 20은 NBR_OF_BARS의 값
      const bar = document.createElement("DIV");
      bar.setAttribute("id", "bar" + i);
      bar.setAttribute("class", "visualizer-container__bar");
      visualizerContainer.appendChild(bar);
    }
  });
}

function setPlayButton() {
  playBtns.forEach((playBtn) => {
    playBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (status == false) {
        // 정지상태일 때 클릭시
        playAudio();
        this.firstChild.classList.remove("fa-play");
        this.firstChild.classList.add("fa-pause");
        status = true;
      } else {
        // 재생중일 때 클릭시
        pauseAudio();
        this.firstChild.classList.remove("fa-pause");
        this.firstChild.classList.add("fa-play");
        status = false;
      }
    });
  });

  backwards.forEach((backward) => {
    backward.addEventListener("click", function (e) {
      e.preventDefault();

      audioEls.forEach((audioEl) => {
        audioEl.currentTime = 0;
        if (status == true) {
          audioEl.play();
        }
      });
    });
  });

  forwards.forEach((forward) => {
    forward.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });
}

function createAudioContext() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)(); // 브라우저 호환성을 위해 수정

    audioEls.forEach((audioEl) => {
      const audioSource = ctx.createMediaElementSource(audioEl);
      analyzer = ctx.createAnalyser();

      audioSource.connect(analyzer);
      audioSource.connect(ctx.destination);
    });
  }
}

function playAudio() {
  if (!ctx) {
    createAudioContext();
  }

  audioEls.forEach((audioEl) => {
    audioEl.volume = 0.3;
    audioEl
      .play()
      .then(() => {
        renderFrame();
      })
      .catch((error) => {
        console.error("Error playing audio:", error);
      });
  });
}

function pauseAudio() {
  audioEls.forEach((audioEl) => {
    audioEl.pause();
    cancelAnimationFrame(animationId); // 중지 상태에서는 애니메이션도 중지
  });
}

function renderFrame() {
  const frequencyData = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(frequencyData);

  for (let i = 0; i < 30; i++) {
    // 30은 NBR_OF_BARS의 값
    const index = (i + 10) * 2;
    const fd = frequencyData[index];
    const bar = document.querySelector("#bar" + i);
    if (bar) {
      const barHeight = Math.max(4, fd || 0);
      bar.style.height = barHeight + "px";
    }
  }

  animationId = window.requestAnimationFrame(renderFrame);
}
