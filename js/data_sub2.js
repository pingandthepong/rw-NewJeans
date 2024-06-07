// .btn_like 클릭 시 .checked
const btnLikes = document.querySelectorAll(".btn_like");

btnLikes.forEach(function (btnLike) {
  btnLike.addEventListener("click", function () {
    btnLike.classList.toggle("checked");
  });
});

// .more 클릭 시 더보기
const more = document.querySelector(".more");
more.addEventListener("click", function (e) {
  e.preventDefault();
});

// .list li mouseenter시 .title.playBtn
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

// max-width: 768px; 이하에서는 전체재생 => 전체, 공유로 텍스트
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

// .mv 터치 이벤트
let startX;
let currentX = 0; // 현재 이동 거리
const ul = document.querySelector(".mv ul");
const ulWidth = ul.scrollWidth;
const viewportWidth = window.innerWidth;

function touchStart(e) {
  startX = e.touches[0].clientX;
}

function touchMove(e) {
  if (!startX) {
    return;
  }

  let endX = e.touches[0].clientX;
  let diffX = startX - endX;

  if (Math.abs(diffX) > 50) {
    // 임계값을 설정하여 스와이프 감지
    if (diffX > 0) {
      // 왼쪽으로 스와이프
      swipeLeft();
    } else {
      // 오른쪽으로 스와이프
      swipeRight();
    }
    startX = null; // 터치 이동 후 시작 위치 초기화
  }
}

function swipeLeft() {
  // 왼쪽으로 스와이프 시 오른쪽으로 이동
  const maxTranslateX = viewportWidth - ulWidth; // 최대 이동 거리
  currentX -= viewportWidth / 2;
  if (currentX < maxTranslateX) {
    currentX = maxTranslateX; // 콘텐츠 끝을 넘어가지 않도록
  }
  ul.style.transform = `translateX(${currentX}px)`;
}

function swipeRight() {
  // 오른쪽으로 스와이프 시 왼쪽으로 이동
  currentX += viewportWidth / 2;
  if (currentX > 0) {
    currentX = 0; // 콘텐츠 시작을 넘어가지 않도록
  }
  ul.style.transform = `translateX(${currentX}px)`;
}

document.addEventListener("touchstart", touchStart, false);
document.addEventListener("touchmove", touchMove, false);
