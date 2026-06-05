const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [
  { x: 200, y: 200 }
];

let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box
};

let direction = "RIGHT";
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function draw() {

  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, 400, 400);

  // food glow
  ctx.shadowBlur = 20;
  ctx.shadowColor = "red";

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(food.x + 10, food.y + 10, 8, 0, Math.PI * 2);
  ctx.fill();

  // snake
  snake.forEach((part, index) => {

    ctx.shadowBlur = 20;

    if(index === 0) {
      ctx.fillStyle = "cyan";
      ctx.shadowColor = "cyan";
    } else {
      ctx.fillStyle = "lime";
      ctx.shadowColor = "lime";
    }

    ctx.fillRect(part.x, part.y, box, box);
  });

  let headX = snake[0].x;
  let headY = snake[0].y;

  if(direction === "UP") headY -= box;
  if(direction === "DOWN") headY += box;
  if(direction === "LEFT") headX -= box;
  if(direction === "RIGHT") headX += box;

  if(headX === food.x && headY === food.y) {
    score++;
    document.getElementById("score").innerText = score;

    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };
  } else {
    snake.pop();
  }

  const newHead = {
    x: headX,
    y: headY
  };

  snake.unshift(newHead);

  // wall collision
  if(
    headX < 0 ||
    headY < 0 ||
    headX >= 400 ||
    headY >= 400
  ) {
    alert("Game Over");
    location.reload();
  }
}

setInterval(draw, 100);
