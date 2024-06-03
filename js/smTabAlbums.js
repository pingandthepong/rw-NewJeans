function updateAlbumImages() {
  let winWidth = window.innerWidth;
  let albumsGrid = document.querySelectorAll(".albums_grid li");

  albumsGrid.forEach(function (album, albumsInd) {
    const index = albumsInd + 1;
    let img = album.querySelector("img");

    // max-width: 640px일 때
    if (winWidth <= 640) {
      if (![2, 3, 5].includes(index)) {
        album.style.display = "none";
      } else {
        album.style.display = "block";

        if (img) {
          img.src = `./images/mainimages/albums/Item-${index}_mobile.jpg`;
        }
      }
    } else {
      // max-width: 768px일 때
      album.style.display = "block";

      if (img) {
        img.src =
          winWidth <= 768
            ? `./images/mainimages/albums/Item-${albumsInd + 1}_smTab.jpg`
            : `./images/mainimages/albums/Item-${albumsInd + 1}.jpg`;
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", updateAlbumImages);
window.addEventListener("resize", updateAlbumImages);

let winWidth = window.innerWidth;
if (winWidth <= 640) {
  const cdsPlay = document.querySelectorAll(".albums_grid li");

  cdsPlay.forEach(function (cd) {
    function overStart(e) {
      e.preventDefault();

      cd.classList.add("cdPlayer");
      cd.style.animationPlayState = "running";
    }
    function outEnd(e) {
      e.preventDefault();

      cd.classList.remove("cdPlayer");
      cd.style.animationPlayState = "paused";
    }
    cd.addEventListener("mouseover", overStart);
    cd.addEventListener("mouseout", outEnd);

    cd.addEventListener("touchstart", overStart, { passive: false });
    cd.addEventListener("touchend", outEnd, { passive: false });
  });
}
