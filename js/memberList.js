const imgWraps = document.querySelectorAll(".img_wrap");
let clickStatus = true; // true(커진 상태), false(원래 상태)

imgWraps.forEach(function (imgWrap) {
  imgWrap.addEventListener("mousemove", function (e) {
    let x = e.offsetX;
    let y = e.offsetY;
    let width = imgWrap.offsetWidth;
    let height = imgWrap.offsetHeight;

    // 마우스 위치에 따른 회전 각도 계산
    let rotateX = (y / height - 0.5) * -40; // 상하 회전 각도 (위-아래 반전)
    let rotateY = (x / width - 0.5) * 40; // 좌우 회전 각도

    imgWrap.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  imgWrap.addEventListener("mouseleave", function () {
    imgWrap.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  });
});
