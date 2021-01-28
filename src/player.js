"use strict";

class Player {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.lives = lives;
    this.size = 50;
    this.x = canvas.width/2;
    this.y = 480;
    this.direction = 0;
    this.speed = 3;
  }



  
  setDirection(direction) {
    // +1 down  -1 up
    if (direction === "left") this.x -=10;
    else if (direction === "right") this.x +=10;
  }

  handleScreenCollision() {
    this.x = this.x + this.direction * this.speed;
    const screenLeft = 0;
    const screenRight = this.canvas.width;

    const playerLeft = this.x;
    const playerRight = this.x + this.size;

    if (playerRight > screenRight) this.x = this.canvas.width-this.size;
    else if (playerLeft < screenLeft) this.x = 1;
  }


  removeLife() {
    this.lives -= 1;
  }

  draw() {
    const img = document.createElement("img");
    img.src = "img/player.png"
    this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
   
  }

  didCollide(deathray) {  //*******fijarse si esto sera didGetShot
    const playerLeft = this.x;
    const playerRight = this.x + this.size;
    const playerTop = this.y;
    const playerBottom = this.y + this.size;

    const deathrayLeft = deathray.x;
    const deathrayRight = deathray.x + deathray.size;
    const deathrayTop = deathray.y;
    const deathrayBottom = deathray.y + deathray.size;

    // Check if the deathray sides intersect with any of the player's sides
    const crossLeft = deathrayLeft <= playerRight && deathrayLeft >= playerLeft;

    const crossRight = deathrayRight >= playerLeft && deathrayRight <= playerRight;

    const crossBottom = deathrayBottom >= playerTop && deathrayBottom <= playerBottom;

    const crossTop = deathrayTop <= playerBottom && deathrayTop >= playerTop;

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true;
    } else {
      return false;
    }
  }

  
}