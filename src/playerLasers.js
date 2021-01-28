"use strict"

class Laser {
  constructor(canvas, x, y) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.size = 15;
    this.width= 25;
    this.height=100;
    this.x = x;  /// tiene que ser la del player
    this.y = y;
    this.speed = 5;
  }

 
  handleScreenCollision() { //esto se puede quitar
    this.x = this.x + this.direction * this.speed;
    const screenLeft = 0;
    const screenRight = this.canvas.width;

    const playerLeft = this.x;
    const playerRight = this.x + this.size;

    if (playerRight > screenRight) this.direction = -1;
    else if (playerLeft < screenLeft) this.direction = 1;
  }

  updatePosition() {
    this.y = this.y - this.speed;
  }


  draw() {
    const img = document.createElement("img");
    img.src = "img/laser.png"
    this.ctx.drawImage(img, this.x, this.y, this.size/2, this.size*2); 
   
  }

  didCollide(deathray) {  //*******fijarse si esto sera didGetShot
    const laserLeft = this.x;
    const laserRight = this.x + this.size;
    const laserTop = this.y;
    const laserBottom = this.y + this.size;

    const deathrayLeft = deathray.x;
    const deathrayRight = deathray.x + deathray.size;
    const deathrayTop = deathray.y;
    const deathrayBottom = deathray.y + deathray.size;

    // Check if the deathray sides intersect with any of the laser's sides
    const crossLeft = deathrayLeft <= laserRight && deathrayLeft >= laserLeft;

    const crossRight = deathrayRight >= laserLeft && deathrayRight <= laserRight;

    const crossBottom = deathrayBottom >= laserTop && deathrayBottom <= laserBottom;

    const crossTop = deathrayTop <= laserBottom && deathrayTop >= laserTop;

    const inside = deathrayLeft <= laserLeft && deathrayRight >= laserRight;


    if ((crossLeft || crossRight || inside) && (crossTop || crossBottom)) {
      
      return true;
    } else {
      return false;
    }
  }
}