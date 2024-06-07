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
