const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;

let snake = [{x: 10, y: 10}];
let direction = {x: 1, y: 0};
let food = {x: 15, y: 15};

function drawSnake() {
  ctx.fillStyle = 'green';
  for (let i = 0; i < snake.length; i++) {
    const {x, y} = snake[i];
    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
  }
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function update() {
  const {x, y} = snake[0];
  const newX = x + direction.x;
  const newY = y + direction.y;

  // Check for collision with food
  if (newX === food.x && newY === food.y) {
    food.x = Math.floor(Math.random() * gridWidth);
    food.y = Math.floor(Math.random() * gridHeight);
  } else {
    // Remove the last segment of the snake
    snake.pop();
  }

  // Check for collision with walls
  if (newX < 0 || newX >= gridWidth || newY < 0 || newY >= gridHeight) {
    clearInterval(intervalId);
    alert('Game over!');
    return;
  }

  // Check for collision with the snake's body
  for (let i = 1; i < snake.length; i++) {
    if (newX === snake[i].x && newY === snake[i].y) {
      clearInterval(intervalId);
      alert('Game over!');
      return;
    }
  }

  // Add the new segment to the beginning of the snake
  snake.unshift({x: newX, y: newY});
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
}

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // Left arrow
      direction = {x: -1, y: 0};
      break;
    case 38: // Up arrow
      direction = {x: 0, y: -1};
      break;
    case 39: // Right arrow
      direction = {x: 1, y: 0};
      break;
    case 40: // Down arrow
      direction = {x: 0, y: 1};
      break;
  }
});

let intervalId = setInterval(function() {
  update();
  draw();
}, 100);