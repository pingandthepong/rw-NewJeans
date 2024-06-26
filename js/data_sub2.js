// DONE: .btn_like 클릭 시 .checked
const btnLikes = document.querySelectorAll(".btn_like");

btnLikes.forEach(function (btnLike) {
  btnLike.addEventListener("click", function () {
    btnLike.classList.toggle("checked");
  });
});

// // TODO: .more 클릭 시 더보기
// const more = document.querySelector(".more");
// more.addEventListener("click", function (e) {
//   e.preventDefault();
// });

// DONE: .list li mouseenter시 .title.playBtn
const listLis = document.querySelectorAll(".list li");
const titles = document.querySelectorAll(".list .title");

function enter(idx) {
  titles[idx].classList.add("playBtn");
}

function leave(idx) {
  titles[idx].classList.remove("playBtn");
}

listLis.forEach(function (listLi, idx) {
  listLi.addEventListener("mouseenter", function () {
    enter(idx);
  });
  listLi.addEventListener("mouseleave", function () {
    leave(idx);
  });
});

// DONE: max-width: 768px; 이하에서는 전체재생 => 전체, 공유로 텍스트
function btnText() {
  const fullPlay = document.querySelector("#fullPlay");
  const share = document.querySelector("#share");

  let winWidth = window.innerWidth;

  if (winWidth <= 768) {
    fullPlay.textContent = "전체";
    share.textContent = "공유";
  } else {
    fullPlay.textContent = "전체재생";
    share.textContent = "공유하기";
  }
}
// 초기 로드 시 실행
btnText();
// resize 이벤트 발생 시 실행
window.addEventListener("resize", () => {
  btnText();
});

// DONE: playlist 기능
const audio = document.querySelector(".new_audio");
const fullPlay = document.querySelector("#fullPlay");
let currentAudioIdx = 0; // 현재 재생 중인 오디오 인덱스

// DONE: 곡마다 재생
titles.forEach((title, titleIdx) => {
  title.addEventListener("click", function (e) {
    e.preventDefault();

    // 같은 제목을 다시 클릭한 경우 (음악이 재생중일 때)
    if (titleIdx === currentAudioIdx && !audio.paused) {
      console.log("이벤트 발생1");
      audio.pause();

      // 전체 title의 pauseBtn 제거
      titles.forEach((t) => {
        t.classList.remove("pauseBtn");
      });

      console.log(titles[titleIdx]);
    } else {
      console.log("이벤트 발생2");

      // 제목 클릭한 경우 (같은제목X)
      audio.src = `./files/new${titleIdx + 1}.mp3`;
      audio.play();

      // 전체 title의 pauseBtn, playBtn 제거
      titles.forEach((t) => {
        t.classList.remove("pauseBtn");
        t.classList.remove("playBtn");
      });
      // 자기 자신만 pauseBtn
      titles[titleIdx].classList.add("pauseBtn");

      console.log(title);
    }

    currentAudioIdx = titleIdx;
  });
});

// // TODO: 전체 재생
// fullPlay.addEventListener("click", function () {
//   // 첫 곡 재생을 위해 초기화
//   currentAudioIdx = 0;

//   // 재생이 끝나면 다음 곡 재생
//   function playNext() {
//     // 현재 재생 중인 곡인 경우
//     if (!audio.paused) {
//       // 다음 곡의 인덱스를 증가시킵니다.
//       currentAudioIdx++;
//       // 모든 곡이 재생된 경우 처음 곡으로 되돌아갑니다.
//       if (currentAudioIdx >= titles.length) {
//         currentAudioIdx = 0;
//       }
//       audio.src = `./files/new${currentAudioIdx + 1}.mp3`;
//       audio.play();
//       // 현재 타이틀에 'pauseBtn' 클래스를 추가하고 이전 타이틀의 클래스를 제거합니다.
//       titles.forEach((title) => title.classList.remove("pauseBtn"));
//       titles[currentAudioIdx].classList.add("pauseBtn");
//     }
//   }

//   // 첫 곡 재생
//   playNext();

//   // 재생이 끝날 때마다 다음 곡을 재생합니다.
//   audio.addEventListener("ended", playNext);
// });
