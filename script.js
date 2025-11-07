const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let score = 0;
let speed = 5;

const player = { x: 180, y: 520, w: 40, h: 20, color: "blue" };
const enemy = { x: 180, y: -40, w: 40, h: 20, color: "red" };

function drawRoad() {
  ctx.fillStyle = "black";
  ctx.fillRect(100, 0, 200, 600);

  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.moveTo(200, i * 30);
    ctx.lineTo(200, i * 30 + 15);
    ctx.stroke();
  }
}

function drawCar(car) {
  ctx.fillStyle = car.color;
  ctx.fillRect(car.x, car.y, car.w, car.h);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoad();
  drawCar(player);
  drawCar(enemy);

  // mover inimigo
  enemy.y += speed;
  if (enemy.y > 600) {
    enemy.y = -40;
    enemy.x = [140, 180, 220][Math.floor(Math.random() * 3)];
    score++;
    if (speed < 15) speed += 0.5;
  }

  // colisão
  if (
    player.x < enemy.x + enemy.w &&
    player.x + player.w > enemy.x &&
    player.y < enemy.y + enemy.h &&
    player.y + player.h > enemy.y
  ) {
    alert("💥 COLISÃO! Pontuação final: " + score);
    score = 0;
    speed = 5;
    enemy.y = -40;
  }

  // pontuação
  ctx.fillStyle = "white";
  ctx.font = "18px Courier";
  ctx.fillText("Pontuação: " + score, 140, 30);

  requestAnimationFrame(update);
}

function moveLeft() {
  if (player.x > 140) player.x -= 40;
}

function moveRight() {
  if (player.x < 220) player.x += 40;
}

document.getElementById("left").addEventListener("click", moveLeft);
document.getElementById("right").addEventListener("click", moveRight);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowRight") moveRight();
});

update();
