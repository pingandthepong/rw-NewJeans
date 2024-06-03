// function updateGalleryImages() {
//   let winWidth = window.innerWidth;
//   let galleryGrid = document.querySelectorAll(".gallery_wrap li");

//   // 브라우저 해상도가 max-width: 640px일 때
//   if (winWidth <= 640) {
//     galleryGrid.forEach(function (gallery, galleryInd) {
//       // 갤러리 항목의 배경 이미지를 변경
//       gallery.style.backgroundImage = `url('./images/mainimages/gallery/gallery-${
//         galleryInd + 1
//       }_mobile.jpg')`;
//     });
//   } else {
//     // 다른 해상도에서는 기본 배경 이미지 설정
//     galleryGrid.forEach(function (gallery, galleryInd) {
//       gallery.style.backgroundImage = `url('./images/mainimages/gallery/gallery_${
//         galleryInd + 1
//       }.jpg')`;
//     });
//   }
// }

// document.addEventListener("DOMContentLoaded", updateGalleryImages);
// window.addEventListener("resize", updateGalleryImages);
