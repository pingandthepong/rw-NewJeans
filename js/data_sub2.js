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
