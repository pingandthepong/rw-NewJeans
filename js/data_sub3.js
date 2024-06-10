document.addEventListener("DOMContentLoaded", function () {
  setBG();
  setHeight();
  setupMenu();
});

document.addEventListener("resize", setHeight);
window.addEventListener("scroll", handleScroll);

// 각 section에 .bg 생성 후 background를 img와 맞추기
function setBG() {
  const sections = document.querySelectorAll("section");
  const imgs = document.querySelectorAll("section img");

  sections.forEach(function (section, secIdx) {
    const bg = document.createElement("div");
    bg.classList.add("bg");
    section.prepend(bg);

    bg.style.background = `url(${imgs[secIdx].src}) no-repeat center`;
    bg.style.backgroundSize = "cover";
    bg.style.backgroundAttachment = "fixed";
  });
}

// ====================================
// ========== one page slide ==========
// ====================================

// section 영역 높이를 브라우저 높이 값으로 자동 설정 (height: 100vh으로 해결했지만, script로도 가능함)
function setHeight() {
  const winH = window.innerHeight;
  const sections = document.querySelectorAll("section");
  sections.forEach(function (section) {
    section.style.height = winH + "px";
  });
}

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

      // menuItems는 유사배열(NodeList)로, 배열 메서드인 forEach는 사용 가능하지만 indexOf같은 배열 전용 메서드는 직접 사용 불가능하기 때문에 Array.from을 통해 배열로 변환
      // const sectionIdx = Array.from(menuItems).indexOf(menuItem);
      // menuItems에서 특정 요소의 인덱스를 찾기 위해 Array.from을 사용한건데, Array.from은 직관적이지만 배열로 변환하는 방식이고, Array.prototype.indexOf.call은 배열로 변환하지 않고도 인덱스를 찾을 수 있기에 성능상의 이점이 있음 (NodeList를 배열로 반환하지 않고도 indexOf 메서드 사용 가능하게 해줌)
      const sectionIdx = Array.prototype.indexOf.call(menuItems, menuItem);
      const targetSection = sections[sectionIdx];
      targetSection.scrollIntoView({ behavior: "smooth" });

      // #menu 클릭시 활성화
      menuItems.forEach((item) => {
        item.classList.remove("on");
      });
      menuItem.classList.add("on");
    });
  });
}

// 화면 스크롤 시 현재 메뉴 활성화
function handleScroll() {
  const sections = document.querySelectorAll("section");
  const menuItems = document.querySelectorAll("#menu li");
  const scroll = window.scrollY || window.pageYOffset;

  sections.forEach(function (section, secIdx) {
    // 각 섹션의 '실제 상단 위치' 계산
    const sectionTop = section.getBoundingClientRect().top + scroll;
    const sectionBottom = sectionTop + section.offsetHeight; // 각 섹션의 맨 아래 위치 계산

    if (scroll >= sectionTop && scroll < sectionBottom - 300) {
      menuItems.forEach((item) => item.classList.remove("on"));
      menuItems[secIdx].classList.add("on");
    } else if (scroll < sectionTop) {
      menuItems[secIdx].classList.remove("on");
    }
  });
}

$(document).ready(function () {
  // section위에서 마우스 휠 이벤트 (delta는 휠의 방향 감지. 올리면 1, 내리면 -1)
  $("section").on("mousewheel", function (event, delta) {
    // 마우스 휠을 올렸을때
    if (delta > 0) {
      // 변수 prev에 현재 휠을 움직인 section에서 이전 section의 offset().top위치 저장
      var prev = $(this).prev().offset().top;
      // 문서 전체를 prev에 저장된 위치로 이동
      $("html,body").stop().animate({ scrollTop: prev }, 500);

      // wheel 이벤트가 여러 번 계산됨을 방지
      return false;

      // 마우스 휠을 내렸을때
    } else if (delta < 0) {
      // 변수 next에 현재 휠을 움직인 section에서 다음 section의 offset().top위치 저장
      var next = $(this).next().offset().top;
      // 문서 전체를 next에 저장된 위치로 이동
      $("html,body").stop().animate({ scrollTop: next }, 500);

      // wheel 이벤트가 여러 번 계산됨을 방지
      return false;
    }
  });
});
// ==============================
// // music player
// const playBtns = document.querySelectorAll(".playBtn");
// const backwards = document.querySelectorAll(".backward");
// const forwards = document.querySelectorAll(".forward");
// const audioEls = document.getElementsByTagName(".new_audio");

// const tracks = [
//   "./files/attention.mp3",
//   "./files/hypeboy.mp3",
//   "./files/cookie.mp3",
//   "./files/hurt.mp3",
// ];

// let currentTrackIdx = 0;
// let status = false; // false(정지상태), true(재생중)
// let ctx, analyzer, animationId;

// // 초기 상태 설정
// window.addEventListener("DOMContentLoaded", (event) => {
//   createVisualizerBars();
//   setPlayButton();
//   loadTrack(currentTrackIdx);
// });

// function setPlayButton() {
//   playBtns.forEach(function (playBtn, index) {
//     playBtn.addEventListener("click", function (e) {
//       e.preventDefault();

//       // btn과 곡 제목 연결
//       const songLists = document.querySelectorAll(".song_list li a");
//       songLists.forEach(function (songList, idx) {
//         if (idx === index) {
//           songList.classList.add("on");
//         } else {
//           songList.classList.remove("on");
//         }
//       });

//       if (status == false) {
//         // 정지상태일 때 클릭시
//         playAudio();
//         this.firstChild.classList.remove("fa-play");
//         this.firstChild.classList.add("fa-pause");
//         status = true;
//       } else {
//         // 재생중일 때 클릭시
//         pauseAudio();
//         this.firstChild.classList.remove("fa-pause");
//         this.firstChild.classList.add("fa-play");
//         status = false;
//       }
//     });
//   });

//   backwards.forEach(function (backward) {
//     backward.addEventListener("click", function (e) {
//       e.preventDefault();

//       audioEls.forEach(function (audioEl) {
//         audioEl.currentTime = 0;
//         if (status == true) {
//           audioEl.play();
//         }
//       });
//     });
//   });

//   forwards.forEach(function (forward) {
//     forward.addEventListener("click", function (e) {
//       e.preventDefault();
//       nextTrack();
//     });
//   });
// }

// function createVisualizerBars() {
//   const visualizerContainer = document.querySelectorAll(
//     ".visualizer-container"
//   );

//   visualizerContainer.forEach(function (visualizer) {
//     visualizerContainer.innerHTML = ""; // 기존 바를 제거하고 새로 추가하도록 수정

//     for (let i = 0; i < 30; i++) {
//       // 30은 NBR_OF_BARS의 값
//       let bar = document.createElement("DIV");
//       bar.setAttribute("id", "bar" + i);
//       bar.setAttribute("class", "visualizer-container__bar");
//       visualizer.appendChild(bar);
//     }
//   });
// }

// function createAudioContext(audioElement) {
//   if (!ctx) {
//     ctx = new (window.AudioContext || window.webkitAudioContext)(); // 브라우저 호환성을 위해 수정
//     analyzer = ctx.createAnalyser();

//     const audioSource = ctx.createMediaElementSource(audioElement);
//     audioSource.connect(analyzer);
//     audioSource.connect(ctx.destination);
//   }
// }

// function playAudio() {
//   const audioElement = audioEls[currentTrackIdx];
//   createAudioContext(audioElement);
//   audioElement.volume = 0.3;
//   audioElement
//     .play()
//     .then(() => {
//       renderFrame();
//     })
//     .catch((error) => {
//       console.error("Error playing audio:", error);
//     });
// }

// function pauseAudio() {
//   audioEls[currentTrackIdx].pause();
//   cancelAnimationFrame(animationId); // 중지 상태에서는 애니메이션도 중지
// }

// function renderFrame() {
//   const frequencyData = new Uint8Array(analyzer.frequencyBinCount);
//   analyzer.getByteFrequencyData(frequencyData);

//   for (let i = 0; i < 30; i++) {
//     // 30은 NBR_OF_BARS의 값
//     const index = (i + 15) * 2;
//     const fd = frequencyData[index];
//     const bar = document.querySelector("#bar" + i);
//     if (bar) {
//       const barHeight = Math.min(Math.max(4, fd || 0), 150); // minHeight4, maxHeight100으로 설정
//       bar.style.height = barHeight + "px";
//     }
//   }

//   animationId = window.requestAnimationFrame(renderFrame);
// }

// function loadTrack(index) {
//   audioEls[index].src = tracks[index];
//   audioEls[index].load();
//   // if (status === true) {
//   //   playAudio(audioEl);
//   // }
// }

// function nextTrack() {
//   currentTrackIdx = (currentTrackIdx + 1) % tracks.length;
//   loadTrack(currentTrackIdx);
// }

// // .badge_title
// const badgeTitles = document.querySelectorAll(".badge_title a");

// badgeTitles.forEach(function (badgeTitle) {
//   const spanTitle = document.createElement("span");
//   spanTitle.classList.add("spanTitle");
//   badgeTitle.appendChild(spanTitle);
//   spanTitle.textContent = "TITLE";
// });

// // .badge_hit
// const badgeHits = document.querySelectorAll(".badge_hit a");

// badgeHits.forEach(function (badgeHit) {
//   const spanHit = document.createElement("span");
//   spanHit.classList.add("spanHit");
//   badgeHit.appendChild(spanHit);
//   spanHit.textContent = "HIT";
// });
