// .btn_like 클릭 시 .checked
const btnLike = document.querySelector(".btn_like");

function checkLike() {
  btnLike.classList.toggle("checked");
}

btnLike.addEventListener("click", checkLike);
