document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("showBtn");
  const cake = document.getElementById("cake");
  const confetti = document.getElementById("confetti");
  const song = document.getElementById("bdaysong"); // <-- your audio element

  let visible = false;

  function popConfetti(count = 140) {
    if (!confetti) return;

    confetti.innerHTML = "";
    const colors = ["#ff6fb7", "#7be7ff", "#ffd06b", "#b6ff7b", "#c7a6ff", "#ffffff"];

    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      piece.className = "piece";

      piece.style.left = Math.random() * 100 + "vw";
      piece.style.setProperty("--dx", (Math.random() * 40 - 20) + "vw");
      piece.style.animationDuration = (Math.random() * 1.7 + 1.8).toFixed(2) + "s";
      piece.style.animationDelay = (Math.random() * 0.25).toFixed(2) + "s";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];

      const w = Math.floor(Math.random() * 6) + 6;
      const h = Math.floor(Math.random() * 10) + 10;
      piece.style.width = w + "px";
      piece.style.height = h + "px";

      confetti.appendChild(piece);
      piece.addEventListener("animationend", () => piece.remove());
    }
  }

  button.addEventListener("click", () => {
    visible = !visible;

    if (visible) {
      // show cake
      cake.classList.remove("hidden");
      cake.classList.add("show");
      cake.setAttribute("aria-hidden", "false");
      button.textContent = "Hide Cake";

      // confetti
      popConfetti();

      // music
      if (song) {
        song.currentTime = 0;
        song.play().catch((err) => {
          console.log("Audio failed to play:", err);
        });
      }
    } else {
      // hide cake
      cake.classList.remove("show");
      cake.classList.add("hidden");
      cake.setAttribute("aria-hidden", "true");
      button.textContent = "Show Cake";

      // clear confetti
      if (confetti) confetti.innerHTML = "";

      // stop music
      if (song) {
        song.pause();
        song.currentTime = 0;
      }
    }
  });
});
