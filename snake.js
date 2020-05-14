
var snake = [], HEIGHT = 20, WIDTH = 20, SIZE = 50, pickItem = null, canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d"), increaceX = 0, increaceY = SIZE, keyListener = mouseListener = null, timer = null, interval = 400
function init() {
  ctx.canvas.width = WIDTH*SIZE;
  ctx.canvas.height = HEIGHT*SIZE;
  var rx = Math.floor(Math.random()*(WIDTH-5)+5), ry = Math.floor(Math.random()*(HEIGHT-5)+5);
	snake = [{x: rx*SIZE, y: ry*SIZE}, {x: (rx+1)*SIZE, y: (ry+1)*SIZE}]
  controls()
  pick()
  interval = 400
  timer = setInterval(loop, interval)
}
function loop() {
  draw()
  check()
}
function draw() {
  ctx.clearRect(0, 0, WIDTH*SIZE, HEIGHT*SIZE);
	for (var i = 0; i < WIDTH*HEIGHT; i++) {
    for (var j = 0; j < WIDTH; j++) {
      ctx.beginPath();
      ctx.rect(j*SIZE, i*SIZE, SIZE, SIZE);
      ctx.strokeStyle = "#cccccc";
      ctx.stroke();
    }
  }
  fillRect(pickItem.x, pickItem.y, "red");
  for (var i = 1; i < snake.length; i++) {
    fillRect(snake[i].x, snake[i].y, "blue")
  }

  var new_head = {x: snake[snake.length-1].x+increaceX, y: snake[snake.length-1].y+increaceY}
  fillRect(new_head.x, new_head.y, "blue")
  snake.shift()
  snake.push(new_head);
}
function fillRect(x, y, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, SIZE, SIZE);
}
function pick() {
  var nx = Math.floor(Math.random()*WIDTH)*SIZE, ny = Math.floor(Math.random()*HEIGHT)*SIZE;
  pickItem = {x: nx, y: ny};
}
function check() {
  // hit himself?
  var head = snake[snake.length-1]
  for (var i = 0; i < snake.length-1; i++) {
    var diff = Math.abs(snake[i].x - head.x) + Math.abs(snake[i].y - head.y);
    if (diff < 1) {
      gameOver()
    }
  }
  // hit wall?
  if (head.x < 0 || head.x >= (WIDTH)*SIZE || head.y >= (HEIGHT)*SIZE || head.y < 0) {
    gameOver()
  }
  // check eat
  diff = Math.abs(snake[snake.length-1].x - pickItem.x) + Math.abs(snake[snake.length-1].y - pickItem.y);
  if (diff < 1) {
    snake.unshift({x: snake[0].x, y: snake[0].y})
    pick()
    interval -= 50
  }
}
function gameOver() {
  clearTimeout(timer)
  timer = null;
  if (confirm("Game Over, play again?")) init()
}
function controls() {
  window.removeEventListener("keydown", keyListener);  
  window.removeEventListener("click", mouseListener);  
  keyListener = window.addEventListener("keydown", event => {
    if (event.keyCode === 37 && increaceX <= 0 || event.keyCode === 39 && increaceX >= 0) {
      increaceX = event.keyCode == 37 ? -SIZE : SIZE;
      increaceY = 0;
    } else if (event.keyCode === 38 && increaceY <= 0 || event.keyCode === 40 && increaceY >= 0) {
      increaceY = event.keyCode == 38 ? -SIZE : SIZE;
      increaceX = 0;
    } else if (event.keyCode === 68) {
      debugger
    }
  });
  mouseListener = window.addEventListener("click", event => {
    var dec = event.pageX*1/window.innerWidth, deh = event.pageY*1/window.innerHeight
    if (dec < .33) {
      increaceX = -SIZE;
      increaceY = 0;
    } else if (dec > .33 && dec < .66) {
      increaceY = deh < 50 ? -SIZE : SIZE;
      increaceX = 0;
    } else {
      increaceX = SIZE;
      increaceY = 0;  
    }
  });
}
init()