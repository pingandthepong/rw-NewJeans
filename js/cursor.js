function spark(e) {
  // 와이드/일반pc에서만 spark 함수 실행
  let winWidth = window.innerWidth;
  if (winWidth > 768) {
    // 마우스 이벤트만 처리
    if (e.type.startsWith("mouse")) {
      let i = document.createElement("i");
      i.classList.add("cursor");

      i.style.left = e.pageX + "px";
      i.style.top = e.pageY + "px";
      i.style.scale = `${Math.random() * 2 + 1}`;
      i.style.setProperty("--x", getRandomTransitionValue());
      i.style.setProperty("--y", getRandomTransitionValue());

      document.body.appendChild(i);

      setTimeout(() => {
        document.body.removeChild(i);
      }, 2000);
    }
  }
}

function getRandomTransitionValue() {
  return `${Math.random() * 400 - 200}px`;
}

document.addEventListener("mousemove", spark);

// 터치이벤트에 대한 이벤트 리스너 제거
document.removeEventListener("touchstart", spark);
document.removeEventListener("touchend", spark);
document.removeEventListener("touchcancel", spark);
document.removeEventListener("touchmove", spark);
