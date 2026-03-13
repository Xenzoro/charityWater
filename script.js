//play sound function
function playSound(src){
  const audio = new Audio(src);
  audio.play();
}

function showGameModal (title, message){
  document.getElementById('gameModalLabel').innerHTML = title;
  document.getElementById('gameModalBody').innerHTML = message;

  const modal = new bootstrap.Modal(document.getElementById('gameModal'));
  modal.show();
}

// Custom cursor logic for gameBox
const gameBox = document.getElementById('gameBox');
const customCursor = document.querySelector('.custom-cursor');

if (gameBox && customCursor) {
  gameBox.addEventListener('mouseenter', () => {
    customCursor.style.display = 'block';
  });
  gameBox.addEventListener('mouseleave', () => {
    customCursor.style.display = 'none';
  });
  gameBox.addEventListener('mousemove', (e) => {
    // Get mouse position relative to gameBox
    const rect = gameBox.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Center the cursor by subtracting half its width/height
    const cursorW = customCursor.offsetWidth;
    const cursorH = customCursor.offsetHeight;
    customCursor.style.left = (x - cursorW / 2) + 'px';
    customCursor.style.top = (y - cursorH / 2) + 'px';
  });
  gameBox.addEventListener('mousedown', () => {
  //change png to cursorwgunshoot png
    customCursor.style.backgroundImage = "url('img/cursorwgunshoot.png')";
    playSound('./wav/watergunshort.mp3');

  });
  //change back to cursorwgun png
  gameBox.addEventListener('mouseup', () => {
    customCursor.style.backgroundImage = "url('img/cursorwgun.png')";
  })

}


// Game configuration and state variables
//im going to change this logic
// const GOAL_CANS = 25;        // Total items needed to collect
// let currentCans = 0;         // Current number of items collected
// let gameActive = false;      // Tracks if game is currently running
// let spawnInterval;          // Holds the interval for spawning items





// Creates the 3x3 game grid where items will appear
// this creates the grid for me
function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell'; // 4 columns per row via CSS flexbox
    grid.appendChild(cell);
  }
}


// Ensure the grid is created when the page loads
createGrid();

//program How to Play button;
document.getElementById('how-to-play').addEventListener('click', () => {
  showGameModal('Game Rules', `
    <ul style="text-align:left; font-size:1.1em; line-height:1.7; margin-left:1em;">
      <li><strong>Hit as many Jerry-Can targets as possible in 30 seconds!</strong></li>
      <li>The closer to the center you hit, the more points you get.</li>
      <li><span style="color:#F5402C;">Avoid hitting <strong>Dirty Water</strong> targets</span> – they cost you 15 points and a life!</li>
      <li>You start with <strong>3 lives</strong>. Lose them all and the game ends.</li>
      <li>The game also ends when the timer runs out.</li>
      <li>Try to get the highest score you can. Good luck and have fun!</li>
    </ul>
  `);
});





//Going to recreate a spawning system that allows for dirty water spawns
const GAME_TIME = 30;
const STARTING_LIVES = 3;

let score = 0;
let lives = STARTING_LIVES; // pass variable into dynamically changing var
let timeLeft = GAME_TIME; // same concept here
let gameActive = false;
let isPaused = false;
let cachePoints =0;

let spawnInterval;
let timerInterval;

//update HUD
function updateHUD() {
  document.getElementById('score').textContent = `Score: ${score}`;
  document.getElementById('time').textContent = `Time: ${timeLeft}s`;
  document.getElementById('lives').textContent = `Lives: ${'💧'.repeat(lives)}`;
}

//clear GRID
function clearGrid() {
  const cells = document.querySelectorAll('.grid-cell');
  cells.forEach(cell => {
    cell.innerHTML = '';
  });
}

// Spawning function - spawns one target per interval
function spawnTarget() {
  if (!gameActive) return;

  clearGrid();

  const cells = document.querySelectorAll('.grid-cell');
  const randomCell = cells[Math.floor(Math.random() * cells.length)];

  // 75% clean, 25% dirty
  const isDirty = Math.random() < 0.25;

  randomCell.innerHTML = `
    <div class="water-can-wrapper">
      <div class="${isDirty ? 'water-can dirty' : 'water-can clean'}"></div>
    </div>
  `;

  const target = randomCell.querySelector('.water-can');
  target.addEventListener('click', handleTargetClick);

  // Target disappears if not clicked within 900ms
  setTimeout(() => {
    if (randomCell.contains(target) && gameActive) {
      randomCell.innerHTML = '';
    }
  }, 900);
}

function handleTargetClick(e) {
  if (!gameActive) return;

  const target = e.currentTarget;
  const isDirty = target.classList.contains('dirty');
  const dirtyHit = 15;// instead of just putting 15 as a magic number, this allows for easier adjustments later if needed

  // Handle dirty water
  if (isDirty) {
    lives--;
    score -= dirtyHit;
    updateHUD();

    playSound('./wav/incorrect.mp3');

    // Show germ hit image
    target.style.backgroundImage = "url('img/germhit.png')";
    
    setTimeout(() => {
      target.parentElement.parentElement.innerHTML = '';
    }, 300);

    if (lives <= 0) {
      endGame(score);
    }
    return;
  }

  // Ring scoring for clean target
  const rect = target.getBoundingClientRect();

  // Use offsetX and offsetY for click position relative to element
  const clickX = e.offsetX;
  const clickY = e.offsetY;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const dx = clickX - centerX;
  const dy = clickY - centerY;

  const distance = Math.sqrt(dx * dx + dy * dy);
  const maxRadius = rect.width / 2;

  let points = 0;
  let hitImage = '';

  if (distance <= maxRadius * 0.33) {
    points = 10;
    hitImage = "url('img/bullseye.png')";
  } else if (distance <= maxRadius * 0.66) {
    points = 5;
    hitImage = "url('img/middlering.png')";
  } else if (distance <= maxRadius) {
    points = 1;
    hitImage = "url('img/outerring.png')";
  } else {
    return; // clicked outside the circle area
  }

  score += points;
  updateHUD();

  playSound('./wav/correct.mp3');

  // Show hit feedback image
  target.style.backgroundImage = hitImage;

  showPoints(points, e.clientX, e.clientY);

  setTimeout(() => {
    target.parentElement.parentElement.innerHTML = '';
  }, 300);
}

function showPoints(points, x, y) {
  const popup = document.createElement('div');
  popup.className = 'points-popup';
  popup.textContent = `+${points}`;

  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 600);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    updateHUD();

    if (timeLeft <= 0) {
      endGame(score);
    }
  }, 1000);
}

// ...existing code...

function pauseGame() {
  if (!gameActive) return;

  isPaused = !isPaused;
  const pauseButton = document.getElementById('pause-game');

  if (isPaused) {
    // Pause the game
    clearInterval(spawnInterval);
    clearInterval(timerInterval);
    pauseButton.textContent = 'Resume Game';
    // display modal message
    showGameModal('Game Paused', 'You paused the game. Click Resume Game to continue.');

    //grab if modal was closed
    const modalElement = document.getElementById('gameModal');

    function modalClosed(){
      pauseButton.textContent = 'Pause Game';
      isPaused = false;
      spawnInterval = setInterval(spawnTarget, 1000);
      startTimer();
      modalElement.removeEventListener('hidden.bs.modal', modalClosed);
    }
    modalElement.addEventListener('hidden.bs.modal', modalClosed);

  }

}

function startGame() {
  if (gameActive) return;

  gameActive = true;
  isPaused = false;
  score = 0;
  lives = STARTING_LIVES;
  timeLeft = GAME_TIME;

  createGrid();
  updateHUD();

  spawnTarget();
  spawnInterval = setInterval(spawnTarget, 1000);
  startTimer();
}

function endGame(points) {
  gameActive = false;
  isPaused = false;

  clearInterval(spawnInterval);
  clearInterval(timerInterval);
  clearGrid();
  //cache points for the fact system
  if(points > 0){
    cachePoints += points;
    document.getElementById('cache-points').textContent = `${cachePoints}`;
  }

  // Reset pause button text
  document.getElementById('pause-game').textContent = 'Pause Game';

  // alert(`Game Over! Final Score: ${score}`); replace with modal call
  if(lives <= 0) {
    showGameModal('Game Over!', `You lost all your lives! Final Score: ${score} try better next time!`);
  }else if(lives > 0){
    confetti({
      particleCount:100,
      spread: 100
    });
    playSound('./wav/tada.mp3');
    if(points > 0){
      cachePoints += points;
    }
    showGameModal('Game Over!', `Time's up! Final Score: ${score} Great job!`);
  }


}

// Set up click handler for the start button
document.getElementById('start-game').addEventListener('click', startGame);

// Set up click handler for the pause button
document.getElementById('pause-game').addEventListener('click', pauseGame);


//this function will take a users cahcePoints and return a Fact
document.getElementById('new-fact').addEventListener('click', () => {
  const facts = [
    "Over 2 billion people worldwide lack access to safe drinking water.",
    "Nearly 771 million people still live without basic access to clean water.",
    "Access to clean water can reduce waterborne diseases by up to 50 percent.",
    "Women and girls spend about 200 million hours every day collecting water.",
    "Clean water can improve school attendance, especially for young girls.",
    "Unsafe water and poor sanitation cause hundreds of thousands of deaths each year.",
    "Access to clean water helps communities grow food, earn income, and stay healthy.",
    "Many families must walk miles every day just to collect water for drinking and cooking.",
    "Clean water projects can transform entire communities and improve quality of life.",
    "Just $40 can help bring clean water to one person in need.",
    "Access to safe water helps reduce childhood illness and improves overall health.",
    "Reliable water sources allow children to spend more time in school instead of collecting water.",
    "Clean water supports better hygiene, which helps prevent the spread of disease.",
    "Water scarcity affects communities across Africa, Asia, and parts of Latin America.",
    "With access to clean water, families can focus on education, work, and building stronger communities.",
  ];
  if(cachePoints < 50) {
    showGameModal('Not Enough Points', `You need at least 50 points to unlock a new fact! Keep playing to earn more points. Current Points: ${cachePoints}`);
  } else {
    const factOutput = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('fact').textContent = factOutput;
    cachePoints -= 50;
    document.getElementById('cache-points').textContent = `${cachePoints}`;

  }






});
