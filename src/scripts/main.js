"use strict";

const Game = require("./game.class");
import { initializeSwipe } from "./swipe.js";
const game = new Game();

const scoreElement = document.querySelector(".game-score");
const startMessage = document.querySelector(".message-start");
const winMessage = document.querySelector(".message-win");
const loseMessage = document.querySelector(".message-lose");
const cells = document.querySelectorAll(".field-cell");
const button = document.querySelector(".button");

function render() {
  const state = game.getState();
  const score = game.getScore();
  const status = game.getStatus();

  cells.forEach((cell, index) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const value = state[row][col];

    cell.textContent = value === 0 ? "" : value;
    cell.className = "field-cell";

    if (value) {
      cell.classList.add(`field-cell--${value}`);
    }
  });

  scoreElement.textContent = score;

  startMessage.classList.add("hidden");
  winMessage.classList.add("hidden");
  loseMessage.classList.add("hidden");

  switch (status) {
    case "idle":
      startMessage.classList.remove("hidden");
      break;
    case "win":
      winMessage.classList.remove("hidden");
      break;
    case "lose":
      loseMessage.classList.remove("hidden");
      break;
  }
}

function handleMove(direction) {
  if (game.getStatus() !== "playing") {
    return;
  }

  switch (direction) {
    case "left":
      game.moveLeft();
      break;

    case "right":
      game.moveRight();
      break;

    case "up":
      game.moveUp();
      break;

    case "down":
      game.moveDown();
      break;

    default:
      return;
  }

  render();
}

button.addEventListener("click", () => {
  if (game.getStatus() === "idle") {
    game.start();

    button.textContent = "Restart";
    button.classList.remove("start");
    button.classList.add("restart");
  } else {
    game.restart();
    game.start();
  }

  render();
});

document.addEventListener("keydown", (event) => {
  if (game.getStatus() !== "playing") {
    return;
  }

  switch (event.key) {
    case "ArrowLeft":
      game.moveLeft();
      break;
    case "ArrowRight":
      game.moveRight();
      break;
    case "ArrowUp":
      game.moveUp();
      break;
    case "ArrowDown":
      game.moveDown();
      break;

    default:
      return;
  }

  render();
});

render();
initializeSwipe(handleMove);

alert(`
Use as setas do teclado ou deslize o dedo na tela.
Junte peças iguais para dobrar seus valores.
Alcance 2048 para vencer.
Boa sorte!
`);