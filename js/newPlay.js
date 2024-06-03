const playBtn = document.getElementById("playBtn");
const backward = document.getElementById("backward");
const forward = document.getElementById("forward");
const audioEl = document.querySelector(".new_audio");

let status = false; // false(정지상태), true(재생중)
let ctx, analyzer, animationId;

// 초기 상태 설정
window.addEventListener("DOMContentLoaded", (event) => {
  createVisualizerBars();
  setPlayButton();
});

function setPlayButton() {
  playBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (status == false) {
      // 정지상태일 때 클릭시
      playAudio();
      this.firstChild.classList.remove("fa-play");
      this.firstChild.classList.add("fa-pause");
      status = true;
    } else {
      // 재생중일 때 클릭시
      pauseAudio();
      this.firstChild.classList.remove("fa-pause");
      this.firstChild.classList.add("fa-play");
      status = false;
    }
  });

  backward.addEventListener("click", function (e) {
    e.preventDefault();
    audioEl.currentTime = 0;
    if (status == true) {
      audioEl.play();
    }
  });

  forward.addEventListener("click", function (e) {
    e.preventDefault();
  });
}

function createVisualizerBars() {
  const visualizerContainer = document.querySelector(".visualizer-container");
  visualizerContainer.innerHTML = ""; // 기존 바를 제거하고 새로 추가하도록 수정

  for (let i = 0; i < 20; i++) {
    // 20은 NBR_OF_BARS의 값
    const bar = document.createElement("DIV");
    bar.setAttribute("id", "bar" + i);
    bar.setAttribute("class", "visualizer-container__bar");
    visualizerContainer.appendChild(bar);
  }
}

function createAudioContext() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)(); // 브라우저 호환성을 위해 수정
    const audioSource = ctx.createMediaElementSource(audioEl);
    analyzer = ctx.createAnalyser();

    audioSource.connect(analyzer);
    audioSource.connect(ctx.destination);
  }
}

function playAudio() {
  if (!ctx) {
    createAudioContext();
  }
  audioEl.volume = 0.3;
  audioEl
    .play()
    .then(() => {
      renderFrame();
    })
    .catch((error) => {
      console.error("Error playing audio:", error);
    });
}

function pauseAudio() {
  audioEl.pause();
  cancelAnimationFrame(animationId); // 중지 상태에서는 애니메이션도 중지
}

function renderFrame() {
  const frequencyData = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(frequencyData);

  for (let i = 0; i < 20; i++) {
    // 20은 NBR_OF_BARS의 값
    const index = (i + 10) * 2;
    const fd = frequencyData[index];
    const bar = document.querySelector("#bar" + i);
    if (bar) {
      const barHeight = Math.max(4, fd || 0);
      bar.style.height = barHeight + "px";
    }
  }

  animationId = window.requestAnimationFrame(renderFrame);
}
