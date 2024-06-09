function subTitle() {
  const subTitle = document.querySelector(".subTitle");
  const subTitleSlices = subTitle.textContent.split(""); // 문자 배열

  subTitle.innerHTML = "";
  subTitleSlices.forEach((subTitleSlice, subTitleInd) => {
    const span = document.createElement("span");
    span.textContent = subTitleSlice;
    subTitle.append(span);
    const winWidth = window.innerWidth;

    setTimeout(function () {
      if (winWidth <= 640) {
        span.classList.add("subSlideUp");
      } else {
        span.classList.add("slideUp");
      }
    }, (subTitleInd + 1) * 200);
  });
}

window.addEventListener("DOMContentLoaded", subTitle);
window.addEventListener("resize", subTitle);
