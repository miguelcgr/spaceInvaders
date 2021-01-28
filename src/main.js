let game;
let splashScreen;
let gameScreen;
let gameOverScreen;
let gameWonScreen;

function buildDom(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  return div.children[0];
}

/*
<main>
  <div class="gameover">
  <div class="greenblock">
  <h1 class="gover">GAME OVER !</h1>
  <p class="score">Your score: <span> ${score} </span></p>
  <p class="score">press s to start again</p>
  </div>
  </div
</main>

*/

function createSplashScreen() {
  splashScreen = buildDom(`
    <main>
      <div class="splash">
      <div class="gameover">
       <div class="greenblock">
        <h1 class="name">SPACE INVADERS</h1>
        <p class="score">press s to start</p>
        <p class="score">left and right arrows to move</p>
        <p class="score">spacebar to shoot</p>
      </div
    </main>
    `);

  document.body.appendChild(splashScreen);

  document.body.onkeydown = function (key) {
    /// para que empieze con S ,  habria que poner un bind ?????
    if (key.keyCode == 83) {
      startGame();
    }
  };
}

function removeSplashScreen() {
  splashScreen.remove();
}

function createGameScreen() {
  gameScreen = buildDom(`
    <main class="game container">
      <header>
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value"></span>
        </div>

        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
      </header>

      <div class="canvas-container">
        <canvas></canvas>
      </div>      
      
    </main>
	`);

  document.body.appendChild(gameScreen);
  //let invaderKilledSound = gameScreen.querySelector("#invader-killed") musica de fondo
  return gameScreen;
}

function removeGameScreen() {
  gameScreen.remove();
}

function createGameOverScreen(score) {
  gameOverScreen = buildDom(`
  <main>
  <div class="gameover">
  <div class="greenblock">
  <h1 class="gover">GAME OVER !</h1>
  <p class="score">Your score: <span> ${score} </span></p>
  <p class="score">press s to start again</p>
  </div>
  </div
</main>
`);
  document.body.appendChild(gameOverScreen);
}

function removeGameOverScreen() {
  if (gameOverScreen !== undefined) {
    gameOverScreen.remove();
  }
}
// game won
function createGameWonScreen() {
  gameWonScreen = buildDom(`
  <main>
    <div class="gameover">
      <div class="greenblock">
        <h1 class="gover">GAME WON !</h1>
        <p class="score">You saved the planet !</p>
        <p class="score">press s to start again</p>
      </div>
    </div
</main>
`);
  document.body.appendChild(gameWonScreen);
}

function removeGameWonScreen() {
  if (gameWonScreen !== undefined) {
    gameWonScreen.remove();
  }
}

function startGame() {
  removeSplashScreen();
  removeGameOverScreen();
  removeGameWonScreen();

  createGameScreen();

  game = new Game();
  game.gameScreen = gameScreen;

  // Start game
  game.start();
}

function endGame(score) {
  removeGameScreen();
  createGameOverScreen(score);
}
function endGameYouWon() {
  removeGameScreen();
  createGameWonScreen();
}
window.addEventListener("load", createSplashScreen);
