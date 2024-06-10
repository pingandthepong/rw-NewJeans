// player 만들기
$(document).ready(function () {
  const musicWrap = document.querySelector(".music_wrap");
  const jacketImg = document.querySelector(".jacket_wrap");
  const songTitle = musicWrap.querySelector(".song_list li a");
  const newAudio = musicWrap.querySelector(".new_audio");
  const playBtn = musicWrap.querySelector(".playBtn");
  const backward = musicWrap.querySelector(".backward");
  const forward = musicWrap.querySelector(".forward");

  const musicAudio2 = document.querySelector(".album2 .new_audio");
  const musicAudio3 = document.querySelector(".album3 .new_audio");

  let musicIndex = 1;
  let musicIndex2 = 1;
  let musicIndex3 = 1;

  let length1 = $(".album1 .song_list li a").size();
  let length2 = $(".album2 .song_list li a").size();
  let length3 = $(".album3 .song_list li a").size();

  $(".album1 .song_list li:eq(0) a").addClass("playing");
  $(".album2 .song_list li:eq(0) a").addClass("playing");
  $(".album3 .song_list li:eq(0) a").addClass("playing");

  // 음악과 관련된 모든 것 load
  function loadMusic(k, num) {
    if (k == 1) {
      newAudio.src = `./files/music1-${num}.mp3`;
    } else if (k == 2) {
      $(".album2 .new_audio").attr("src", "./files/music2-" + num + ".mp3");
    } else if (k == 3) {
      $(".album3 .new_audio").attr("src", "./files/music3-" + num + ".mp3");
    }
  }

  // 플레이
  function playMusic(k) {
    if (k == 1) {
      musicWrap.classList.add("paused");
      playBtn.setAttribute("title", "일시정지");
      playBtn.firstChild.setAttribute("class", "fa-solid fa-pause");
      newAudio.play();
      jacketImg.classList.add("playOn");
      $(".album1 .song_list li a").removeClass("playing");
      $(".album1 .song_list li:eq(" + (musicIndex - 1) + ") a").addClass(
        "playing"
      );
    } else if (k == 2) {
      $(".album2 .music_wrap").addClass("paused");
      $(".album2 .playBtn").attr("title", "일시정지");
      $(".album2 .playBtn i").attr("class", "fa-solid fa-pause");
      musicAudio2.play();
      $(".album2 .jacket_wrap").addClass("playOn");
      $(".album2 .song_list li a").removeClass("playing");
      $(".album2 .song_list li:eq(" + (musicIndex2 - 1) + ") a").addClass(
        "playing"
      );
    } else if (k == 3) {
      $(".album3 .music_wrap").addClass("paused");
      $(".album3 .playBtn").attr("title", "일시정지");
      $(".album3 .playBtn i").attr("class", "fa-solid fa-pause");
      musicAudio3.play();
      $(".album3 .jacket_wrap").addClass("playOn");
      $(".album3 .song_list li a").removeClass("playing");
      $(".album3 .song_list li:eq(" + (musicIndex3 - 1) + ") a").addClass(
        "playing"
      );
    }
  }

  // 일시정지
  function pauseMusic(k) {
    if (k == 1) {
      musicWrap.classList.remove("paused");
      playBtn.setAttribute("title", "재생");
      playBtn.firstChild.setAttribute("class", "fa-solid fa-play");
      newAudio.pause();
      jacketImg.classList.remove("playOn");
    } else if (k == 2) {
      $(".album2 .music_wrap").removeClass("paused");
      $(".album2 .playBtn").attr("title", "재생");
      $(".album2 .playBtn i").attr("class", "fa-solid fa-play");
      musicAudio2.pause();
      $(".album2 .jacket_wrap").removeClass("playOn");
    } else if (k == 3) {
      $(".album3 .music_wrap").removeClass("paused");
      $(".album3 .playBtn").attr("title", "재생");
      $(".album3 .playBtn i").attr("class", "fa-solid fa-play");
      musicAudio3.pause();
      $(".album3 .jacket_wrap").removeClass("playOn");
    }
  }

  // 이전곡 듣기
  function prevMusic(num) {
    if (num == 1) {
      musicIndex--;
      musicIndex < 1 ? (musicIndex = length1) : (musicIndex = musicIndex);
      loadMusic(num, musicIndex);
      playMusic(1);
    } else if (num == 2) {
      musicIndex2--;
      musicIndex2 < 1 ? (musicIndex2 = length2) : (musicIndex2 = musicIndex2);
      loadMusic(num, musicIndex2);
      playMusic(2);
    } else if (num == 3) {
      musicIndex3--;
      musicIndex3 < 1 ? (musicIndex3 = length3) : (musicIndex3 = musicIndex3);
      loadMusic(num, musicIndex3);
      playMusic(3);
    }
  }

  // 다음곡 듣기
  function nextMusic(num) {
    if (num == 1) {
      musicIndex++;
      musicIndex > length1 ? (musicIndex = 1) : (musicIndex = musicIndex);
      loadMusic(num, musicIndex);
      playMusic(1);
    } else if (num == 2) {
      musicIndex2++;
      musicIndex2 > length2 ? (musicIndex2 = 1) : (musicIndex2 = musicIndex2);
      loadMusic(num, musicIndex2);
      playMusic(2);
    } else if (num == 3) {
      musicIndex3++;
      musicIndex3 > length3 ? (musicIndex3 = 1) : (musicIndex3 = musicIndex3);
      loadMusic(num, musicIndex3);
      playMusic(3);
    }
  }

  // 재생 일시정지
  playBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const isMusicPaused = musicWrap.classList.contains("paused");
    isMusicPaused ? pauseMusic(1) : playMusic(1);
  });

  backward.addEventListener("click", (e) => {
    e.preventDefault();
    prevMusic(1);
  });
  forward.addEventListener("click", (e) => {
    e.preventDefault();
    nextMusic(1);
  });

  $(".album2 .playBtn").click(function (e) {
    e.preventDefault();
    const isMusicPaused = $(".album2 .music_wrap").is(".paused");
    isMusicPaused ? pauseMusic(2) : playMusic(2);
  });
  $(".album2 .backward").click(function (e) {
    e.preventDefault();
    prevMusic(2);
  });
  $(".album2 .forward").click(function (e) {
    e.preventDefault();
    nextMusic(2);
  });

  $(".album3 .playBtn").click(function (e) {
    e.preventDefault();
    const isMusicPaused = $(".album3 .music_wrap").is(".paused");
    isMusicPaused ? pauseMusic(3) : playMusic(3);
  });
  $(".album3 .backward").click(function (e) {
    e.preventDefault();
    prevMusic(3);
  });
  $(".album3 .forward").click(function (e) {
    e.preventDefault();
    nextMusic(3);
  });
});
