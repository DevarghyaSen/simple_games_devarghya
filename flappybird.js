// Initialize canvas and context
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Set up bird and pipe variables
var bird = {
    x: 50,
    y: canvas.height/2,
    size: 20,
    speed: 2,
    gravity: 0.1,
    jump: -4,
    alive: true
};
var pipes = [];
var pipeWidth = 50;
var pipeGap = 100;
var pipeSpeed = 2;
var pipeFrequency = 100;

// Set up event listeners
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && bird.alive) {
        bird.speed = bird.jump;
    }
});
document.addEventListener('click', function(event) {
    if (bird.alive) {
        bird.speed = bird.jump;
    }
});

// Main game loop
function loop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bird
    ctx.fillStyle = 'red';
    ctx.fillRect(bird.x, bird.y, bird.size, bird.size);
    
    // Update bird position
    bird.speed += bird.gravity;
    bird.y += bird.speed;
    
    // Check for collision with top/bottom of screen
    if (bird.y < 0 || bird.y + bird.size > canvas.height) {
        bird.alive = false;
    }
    
    // Draw pipes
    if (pipes.length === 0 || pipes[pipes.length-1].x + pipeGap < canvas.width - pipeFrequency) {
        var pipeY = Math.floor(Math.random() * (canvas.height - pipeGap));
        pipes.push({
            x: canvas.width,
            y: pipeY,
            width: pipeWidth,
            height: canvas.height - pipeY
        });
    }
    for (var i = 0; i < pipes.length; i++) {
        ctx.fillStyle = 'green';
        ctx.fillRect(pipes[i].x, 0, pipes[i].width, pipes[i].y);
        ctx.fillRect(pipes[i].x, pipes[i].y + pipeGap, pipes[i].width, pipes[i].height);
        pipes[i].x -= pipeSpeed;
        
        // Check for collision with pipes
        if (bird.x + bird.size > pipes[i].x && bird.x < pipes[i].x + pipes[i].width) {
            if (bird.y < pipes[i].y || bird.y + bird.size > pipes[i].y + pipeGap) {
                bird.alive = false;
            }
        }
        
        // Remove pipes when they go offscreen
        if (pipes[i].x + pipes[i].width < 0) {
            pipes.splice(i, 1);
            i--;
        }
    }
    
    // Check if bird is still alive
    if (bird.alive) {
        requestAnimationFrame(loop);
    } else {
        alert('Game over!');
    }
}
// Initialize canvas and context
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Set up bird and pipe variables
var bird = {
    x: 50,
    y: canvas.height/2,
    size: 20,
    speed: 2,
    gravity: 0.1,
    jump: -4,
    alive: true
};
var pipes = [];
var pipeWidth = 50;
var pipeGap = 155;
var pipeSpeed = 2;
var pipeFrequency = 110;
var score = 0;

// Set up event listeners
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && bird.alive) {
        bird.speed = bird.jump;
    }
});

document.addEventListener('click', function(event) {
    if (bird.alive) {
        bird.speed = bird.jump;
    }
});

// Main game loop
function loop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bird
    ctx.fillStyle = 'red';
    ctx.fillRect(bird.x, bird.y, bird.size, bird.size);
    
    // Update bird position
    bird.speed += bird.gravity;
    bird.y += bird.speed;
    
    // Check for collision with top/bottom of screen
    if (bird.y < 0 || bird.y + bird.size > canvas.height) {
        bird.alive = false;
    }
    
    // Draw pipes
    if (pipes.length === 0 || pipes[pipes.length-1].x + pipeGap < canvas.width - pipeFrequency) {
        var pipeY = Math.floor(Math.random() * (canvas.height - pipeGap));
        pipes.push({
            x: canvas.width,
            y: pipeY,
            width: pipeWidth,
            height: canvas.height - pipeY
        });
    }
    for (var i = 0; i < pipes.length; i++) {
        ctx.fillStyle = 'green';
        ctx.fillRect(pipes[i].x, 0, pipes[i].width, pipes[i].y);
        ctx.fillRect(pipes[i].x, pipes[i].y + pipeGap, pipes[i].width, pipes[i].height);
        pipes[i].x -= pipeSpeed;
        
        // Check for collision with pipes
        if (bird.x + bird.size > pipes[i].x && bird.x < pipes[i].x + pipes[i].width) {
            if (bird.y < pipes[i].y || bird.y + bird.size > pipes[i].y + pipeGap) {
                bird.alive = false;
            }
        }
        
        // Increment score if bird passes a pipe
        if (bird.x > pipes[i].x + pipes[i].width && !pipes[i].scored) {
            pipes[i].scored = true;
            score++;
        }
        
        // Remove pipes when they go offscreen
        if (pipes[i].x + pipes[i].width < 0) {
            pipes.splice(i, 1);
            i--;
        }
    }
    
    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
    
    // Check if bird is still alive
    if (bird.alive) {
        requestAnimationFrame(loop);
    } else {
        alert('Game over! Your score is ' + score);
        
    }
}

// Start game loop
loop();

