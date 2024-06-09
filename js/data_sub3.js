// 각 section에 .bg 생성 후 background를 img와 맞추기
const sections = document.querySelectorAll("section");
const imgs = document.querySelectorAll("section img");

sections.forEach(function (section, secIdx) {
  const bg = document.createElement("div");
  bg.classList.add("bg");
  section.prepend(bg);

  bg.style.background = `url(${imgs[secIdx].src}) no-repeat center`;
  bg.style.backgroundSize = "cover";
  bg.style.backgroundAttachment = "fixed";
});

// #menu li animation delay
const menuList = document.querySelectorAll("#menu li");
menuList.forEach(function (li, liIdx) {
  setTimeout(function () {
    li.classList.add("ani");
  }, 200 * liIdx);
});

// one page slide
