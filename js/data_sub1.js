var xhr = new XMLHttpRequest();

xhr.onload = function () {
  // 서버 환경에서만 작동함
  if (xhr.status === 200) {
    responseObject = JSON.parse(xhr.responseText);

    var newContent = "";
    newContent += `<h3 class="hidden">멤버 소개</h3>`;

    responseObject.memberInfo.forEach(function (item) {
      newContent += `<div class="section_wrap">`;
      newContent += `<h4 class="name">${item.name}</h4>`;
      newContent += `<dl class="description">`;
      newContent += `<dt>FNAME</dt>`;
      newContent += `<dd>${item.fname}</dd>`;
      newContent += `<dt>BIRTH</dt>`;
      newContent += `<dd>${item.bday}</dd>`;
      newContent += `<dt>MBTI</dt>`;
      newContent += `<dd>${item.mbti}</dd>`;
      newContent += `<dt>POSITION</dt>`;
      newContent += `<dd>${item.position}</dd></dl>`;
      newContent += `<ul class="photos">`;
      newContent += `<li><img src="./images/sub1/${item.name}-1.jpg" alt="${item.kname} 사진1" /></li>`;
      newContent += `<li><img src="./images/sub1/${item.name}-2.jpg" alt="${item.kname} 사진2" /></li>`;
      newContent += `<li><img src="./images/sub1/${item.name}-3.jpg" alt="${item.kname} 사진3" /></li>`;
      newContent += `<li><img src="./images/sub1/${item.name}-4.jpg" alt="${item.kname} 사진4" /></li>`;
      newContent += `<li><img src="./images/sub1/${item.name}-5.jpg" alt="${item.kname} 사진5" /></li>`;
      newContent += `</ul></div>`;
    });

    var section = document.getElementById("section");
    section.innerHTML = newContent;
  } else {
    console.error(`데이터 로드 에러. 상태 코드: ${xhr.status}`);
  }

  // ===================================
  const imgWrap = document.querySelector(".img_wrap");
  const sub1ConBg = document.querySelector("img.sub1_content_bg");
  const sub1ContentHeight = document.querySelector("#content").offsetTop + 100;
  const allSection = document.querySelector("#section");
  const sectionWraps = document.querySelectorAll(".section_wrap");

  // DONE: .img_wrap의 높이를 section 전체의 높이에 맞추기
  // DONE: section이 scrollTop에 딱 걸리면, .img_wrap이 position:fixed로 변하기
  function sub1Fixed() {
    imgWrap.style.height = allSection.clientHeight + "px";
    let scroll = window.scrollY;
    if (scroll >= sub1ContentHeight) {
      sub1ConBg.style.position = "fixed";
      sub1ConBg.style.left = 0;
      sub1ConBg.style.top = -100 + "px";

      let winWidth = window.innerWidth;

      if (winWidth <= 640) {
        sub1ConBg.style.top = -25 + "px";
      }
    } else {
      sub1ConBg.style.position = "static";
    }
  }

  window.addEventListener("scroll", sub1Fixed);
  window.addEventListener("resize", sub1Fixed);

  // DONE: .name split & hover
  let mnames = document.querySelectorAll(".name"); // NodeList 반환

  mnames.forEach((mname) => {
    let mnameSplit = mname.innerText.split("");

    mname.innerHTML = mnameSplit.map((char) => `<span>${char}</span>`).join("");

    mname.querySelectorAll("span").forEach((span) => {
      span.addEventListener("mouseenter", function () {
        this.style.textShadow = "var(--shinySmall)";
        this.style.cursor = "default";
      });
      span.addEventListener("mouseleave", function () {
        this.style.textShadow = "2px 2px 1px var(--main)";
      });
    });
  });
};

xhr.open("GET", "./data/sub1Data.json", true);
xhr.send(null);
