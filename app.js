import { updateBird } from "./bird.js";
import { setupBird } from "./bird.js";
import { getBirdRect } from "./bird.js";
import { getPipeRects, updatePipe } from "./pipe.js";
import { setupPipes } from "./pipe.js";
import { getPassedPipesCount } from "./pipe.js";

document.addEventListener("click", handleStart, { once: true });
const title = document.querySelector("[data-title]");
const subtitle = document.querySelector("[data-subtitle]");

let lastTime;

function updateLoop(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
    return;
  }
  const delta = time - lastTime;
  updateBird(delta);
  updatePipe(delta);
  if (checkLose()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(updateLoop);
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function checkLose() {
  const birdRect = getBirdRect();
  const insidePipe = getPipeRects().some((rect) => isCollision(birdRect, rect));
  const outside = birdRect.top < 0 || birdRect.bottom > window.innerHeight;
  return outside || insidePipe;
}

function handleStart() {
  title.classList.add("hide");
  setupBird();
  setupPipes();
  lastTime = null;
  window.requestAnimationFrame(updateLoop);
}

function handleLose() {
  setTimeout(() => {
    title.classList.remove("hide");
    subtitle.classList.remove("hide");
    subtitle.textContent = `${getPassedPipesCount()} pipes`;
    document.addEventListener("keypress", handleStart, { once: true });
  }, 150);
}
