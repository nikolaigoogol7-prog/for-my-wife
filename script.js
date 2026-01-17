const clickBox = document.getElementById("clickBox");
const message = document.getElementById("message");
const rainLayer = document.getElementById("rainLayer");

let started = false;
let intervalId = null;

function spawnSmile() {
  const el = document.createElement("div");
  el.className = "smile";
  el.textContent = ":)";

  // random horizontal position (0–100vw)
  const left = Math.random() * 100;
  el.style.left = `${left}vw`;

  // random size + duration
  const size = 16 + Math.random() * 26;        // 16–42px
  const duration = 2.8 + Math.random() * 3.4;  // 2.8–6.2s
  el.style.fontSize = `${size}px`;
  el.style.animationDuration = `${duration}s`;

  // slight random drift via translateX using CSS variable-like approach
  const drift = (Math.random() * 140) - 70; // -70..70
  el.style.transform = `translateX(${drift}px)`;

  rainLayer.appendChild(el);

  // cleanup after animation ends
  el.addEventListener("animationend", () => el.remove());
}

function startRain() {
  // density: how many smiles per second
  const ms = 140; // lower = more
  intervalId = setInterval(() => {
    // burst a couple sometimes
    spawnSmile();
    if (Math.random() < 0.35) spawnSmile();
  }, ms);
}

clickBox.addEventListener("click", () => {
  if (!started) {
    started = true;

    message.textContent = "you dont love me";
    message.classList.add("show");

    clickBox.textContent = "again?";
    startRain();
  } else {
    // On repeated clicks: quick burst
    for (let i = 0; i < 20; i++) setTimeout(spawnSmile, i * 25);
  }
});
