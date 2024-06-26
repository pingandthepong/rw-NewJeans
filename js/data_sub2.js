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
let currentAudioIdx = 0; // 현재 재생 중인 오디오 인덱스

// DONE: 곡마다 재생
titles.forEach((title, titleIdx) => {
  title.addEventListener("click", function (e) {
    e.preventDefault();

    // 같은 제목을 다시 클릭한 경우
    if (titleIdx === currentAudioIdx && !audio.paused) {
      audio.pause();
      titles[titleIdx].classList.remove("pauseBtn");
      titles[titleIdx].classList.add("playBtn");
    } else {
      // 제목 클릭한 경우 (같은제목X)
      audio.src = `./files/new${titleIdx + 1}.mp3`;
      audio.play();
      titles[titleIdx].classList.add("pauseBtn");
    }

    currentAudioIdx = titleIdx;
  });
});

// TODO: 전체 재생
