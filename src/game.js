"use strict"; // game
const explosion = new Audio("sounds/explosion.wav");
const noise = new Audio("sounds/shoot.wav");
const invaderKilled = new Audio("sounds/invaderkilled.wav");
const youWin= new Audio("sounds/jingle-win-00.wav");
const youLose= new Audio("sounds/jingle-lose-01.wav");

class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.deathrays = [];
    this.laser = null; // lasers shot by the player
    this.player = null;
    this.gameIsOver = false;
    this.gameIsWon = false;
    this.gameScreen = null;
    this.score = 0;
    this.armyArr = [];
    
  }

  // Create `ctx`, a `player` and start the Canvas loop
  start() {
    this.canvasContainer = document.querySelector(".canvas-container");
    this.canvas = this.gameScreen.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    // Save reference to the score and live elements
    this.livesElement = this.gameScreen.querySelector(".lives .value");
    this.scoreElement = this.gameScreen.querySelector(".score .value");

    // Set the canvas dimesions to match the parent
    this.containerWidth = this.canvasContainer.offsetWidth;
    this.containerHeight = this.canvasContainer.offsetHeight;
    this.canvas.setAttribute("width", this.containerWidth);
    this.canvas.setAttribute("height", this.containerHeight);

    this.player = new Player(this.canvas, 3);

    // push invaders into armyArr
    initialInvaders.forEach((element) => {
      const newInvader = new Invader(
        this.canvas,
        this.player.x + element.x,
        element.y,
        element.speed
      );
      this.armyArr.push(newInvader);
    });

   
    // Add event listener for moving the player

    function handleKeyDown(event) {
      if (event.key === "ArrowLeft") {
        this.player.setDirection("left");
      } else if (event.key === "ArrowRight") {
        this.player.setDirection("right");
      } else if (event.key === " ") {
        //var noise = new Audio("sounds/shoot.wav");
        noise.play();
        var laserX = this.player.x + 25;
        this.laser = new Laser(this.canvas, laserX, 450);
        this.laser.draw();
      }
    }

    // esto lo bind al game object y no al window object
    const boundHandleKeyDown = handleKeyDown.bind(this);
    document.body.addEventListener("keydown", boundHandleKeyDown);

    this.startLoop();
  }

  startLoop() {
    const loop = function () {
      // crea enemigos (deathrays)
      if (Math.random() > 0.97) {
        let randomX = this.armyArr[
          Math.floor(Math.random() * this.armyArr.length)
        ].x;
        let randomY = this.armyArr[
          Math.floor(Math.random() * this.armyArr.length)
        ].y;
        //var randomX = this.canvas.width * Math.random();
        var newDeathray = new Deathray(this.canvas, randomX, randomY, 2);
        this.deathrays.push(newDeathray);
      }

      
      this.checkCollisions();
      this.checkLaserHits();

      this.checkLaserImpacts();

      this.checkArmyDistance();
      this.checkArmyLeft();

      // // 3. Update the player and check if player is going off the screen
      this.player.handleScreenCollision();


      // we check if each invader is collisioning with the screen
      this.armyArr.forEach((invader) => {
        invader.handleScreenCollision();
      });
  
      // // 4. Move the existing enemies
      // // 5. Check if any enemy is going of the screen
      this.deathrays = this.deathrays.filter(function (deathray) {
        deathray.updatePosition();
        return deathray.isInsideScreen();
      });

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.player.draw(); 

      if (this.laser) {
        this.laser.draw();
        this.laser.updatePosition();
      }
     
      this.armyArr.forEach(function (invader) {
        invader.draw();
      });

      this.deathrays.forEach(function (deathray) {
        deathray.draw();
      });

      if (!this.gameIsOver) {
        window.requestAnimationFrame(loop);
      }

      // 5. UPDATE GAME STATUS
      this.updateGameStats();
    }.bind(this);

    // As loop function will be continuously invoked by
    // the `window` object- `window.requestAnimationFrame(loop)`
    // we have to bind the function so that value of `this` is
    // pointing to the `game` object, like this:
    // var loop = (function(){}).bind(this);

    window.requestAnimationFrame(loop);
  }

  checkCollisions() {
    // chequea si el player colisiona con los deathrays
    this.deathrays.forEach(function (deathray) {
      if (this.player.didCollide(deathray)) {
        console.log("deathray collision player");
        this.player.removeLife();
        console.log("lives", this.player.lives);
        //const explosion = new Audio("sounds/explosion.wav");
        explosion.play();
        deathray.y = 0 - deathray.size;

        if (this.player.lives === 0) {
          this.gameOver();
        }
      }
    }, this);
  }

  checkLaserHits() {
    //chequea si el laser choca con el deathray
    this.deathrays.forEach(function (deathray) {
      if (this.laser) {
        if (this.laser.didCollide(deathray)) {
          deathray.y = 0 - deathray.size;
          this.laser = null; //.y = 0 - this.laser.size;
        }
      }
    }, this);
  }

  checkLaserImpacts() {
    let newArmy = this.armyArr.filter((invader) => {
      if (this.laser && this.laser.didCollide(invader)) {
        this.laser = null;
        this.score += 1;
        //const invaderKilled = new Audio("sounds/invaderkilled.wav");
        invaderKilled.play();
        return false;
      } else {
        return true;
      }
    });

    this.armyArr = newArmy;
  }

 
  //

  //

  checkArmyDistance() {
    // chequea si el army esta a la altura del jugador, si lo está -> game over
    this.armyArr.forEach(function (invader) {
      if (invader.y >= this.player.y) {
        this.gameOver();
      }
    }, this);
  }

  checkArmyLeft() {
    if (this.armyArr.length === 0) {
      this.gameWon();
    }
  }

  //
  gameOver() {
    this.gameIsOver = true;
    //const youLose= new Audio("sounds/jingle-lose-01.wav");
    youLose.play();
    endGame(this.score);
  }

  gameWon() {
    this.gameIsWon = true;
    //const youWin= new Audio("sounds/jingle-win-00.wav");
    youWin.play();
    endGameYouWon();
  }

  updateGameStats() {
    this.livesElement.innerHTML = this.player.lives;
    this.scoreElement.innerHTML = this.score;
  }
}
