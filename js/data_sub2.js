// .btn_like 클릭 시 .checked
const btnLike = document.querySelector(".btn_like");

function checkLike() {
  btnLike.classList.toggle("checked");
}

btnLike.addEventListener("click", checkLike);

// .more 클릭 시 더보기
const more = document.querySelector(".more");
more.addEventListener("click", function (e) {
  e.preventDefault();
});
