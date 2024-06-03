function startCountdown() {
  const targetDate = new Date("2025-05-24T13:00:00").getTime();
  const countdownEl = document.querySelector(".countdown");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      countdownEl.innerHTML = "00:00:00:00";
      clearInterval(interval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `
                    ${String(days).padStart(2, "0")} :
                    ${String(hours).padStart(2, "0")} :
                    ${String(minutes).padStart(2, "0")} :
                    ${String(seconds).padStart(2, "0")}
                `;
  }

  const interval = setInterval(updateCountdown, 1000);
  updateCountdown();
}

document.addEventListener("DOMContentLoaded", startCountdown);
