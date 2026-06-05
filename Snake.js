const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [{ x: 9 * box, y: 9 * box }];
let direction = "RIGHT";

let food = randomFood();

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) return true;
  }
  return false;
}

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, 400, 400);

  // snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;

  // game over conditions
  if (
    headX < 0 ||
    headY < 0 ||
    headX >= 400 ||
    headY >= 400 ||
    collision({ x: headX, y: headY }, snake)
  ) {
    clearInterval(game);
    alert("Game Over");
    return;
  }

  if (headX === food.x && headY === food.y) {
    food = randomFood();
  } else {
    snake.pop();
  }

  snake.unshift({ x: headX, y: headY });
}

let game = setInterval(draw, 120);
