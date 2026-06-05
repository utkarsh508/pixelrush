const canvas = document.getElementById("carGame");
const ctx = canvas.getContext("2d");

let player = {
  x: 130,
  y: 420,
  width: 40,
  height: 60
};

let enemy = {
  x: Math.floor(Math.random() * 3) * 100 + 30,
  y: -60,
  width: 40,
  height: 60,
  speed: 4
};

let score = 0;

document.addEventListener("keydown", movePlayer);

function movePlayer(e) {
  if (e.key === "ArrowLeft" && player.x > 30) player.x -= 100;
  if (e.key === "ArrowRight" && player.x < 230) player.x += 100;
}

function collision(a, b) {
  return !(
    a.x > b.x + b.width ||
    a.x + a.width < b.x ||
    a.y > b.y + b.height ||
    a.y + a.height < b.y
  );
}

function drawRoad() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, 300, 500);

  ctx.strokeStyle = "#fff";
  ctx.setLineDash([20, 20]);

  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(100 * (i + 1), 0);
    ctx.lineTo(100 * (i + 1), 500);
    ctx.stroke();
  }
}

function drawCar(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 40, 60);
}

function update() {
  drawRoad();

  // player
  drawCar(player.x, player.y, "lime");

  // enemy
  drawCar(enemy.x, enemy.y, "red");

  enemy.y += enemy.speed;

  if (enemy.y > 500) {
    enemy.y = -60;
    enemy.x = Math.floor(Math.random() * 3) * 100 + 30;
    score++;
  }

  if (collision(player, enemy)) {
    alert("Game Over! Score: " + score);
    document.location.reload();
  }

  // score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  requestAnimationFrame(update);
}

update();
