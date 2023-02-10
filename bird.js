const birdElm = document.querySelector("[data-bird]");
const BIRD_SPEED = 0.5;
const JUMP_DURATION = 200;
let timeSinceLastJump = Number.POSITIVE_INFINITY;

export function setupBird() {
  setTop(window.innerHeight / 2);
  document.removeEventListener("keypress", handleJump);
  document.addEventListener("keypress", handleJump);
}

export function getBirdRect() {
  return birdElm.getBoundingClientRect();
}

export function updateBird(delta) {
  if (timeSinceLastJump < JUMP_DURATION) {
    setTop(getTop() - BIRD_SPEED * delta);
  } else {
    setTop(getTop() + BIRD_SPEED * delta);
  }
  timeSinceLastJump += delta;
}

function setTop(top) {
  birdElm.style.setProperty("--bird-top", top);
}

function getTop() {
  return parseFloat(getComputedStyle(birdElm).getPropertyValue("--bird-top"));
}

function handleJump(e) {
  if (e.code !== "Space") return;

  timeSinceLastJump = 0;
}
