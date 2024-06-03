const gallery = document.querySelector(".gallery");
const galleryOffsetTop = getOffsetTop(gallery) - 400;
const galleryWrap = document.querySelector(".gallery_wrap");
let galleryEls = Array.from(galleryWrap.children); // NodeList을 배열로 변환

let lastScrollTop = 0;

function getOffsetTop(e) {
  let rect = e.getBoundingClientRect();
  return rect.top + window.scrollY - document.documentElement.clientTop;
}

// 스크롤이 gallery에 닿으면
window.addEventListener("scroll", function () {
  let scroll = window.scrollY || window.scrollTop;
  let winWidth = window.innerWidth;

  // console.log(`galleryOffsetTop = ${galleryOffsetTop}`);
  // console.log(`scroll = ${scroll}`);

  if (winWidth > 640) {
    // 모바일 제외
    if (scroll >= galleryOffsetTop) {
      galleryEls.forEach(function (galleryEl, gallInd) {
        setTimeout(function () {
          galleryEl.style.backgroundImage = `url('./images/mainimages/gallery/gallery_${
            gallInd + 1
          }.jpg')`;
        }, (gallInd + 1) * 120);
      });
    }
  } else if (winWidth <= 640) {
    // 모바일
    if (scroll >= galleryOffsetTop - 500) {
      galleryEls.forEach(function (galleryEl, gallInd) {
        setTimeout(function () {
          galleryEl.style.backgroundImage = `url('./images/mainimages/gallery/gallery-${
            gallInd + 1
          }_mobile.jpg')`;
        }, (gallInd + 1) * 200);
      });
    }
  }

  lastScrollTop = scroll;
});
