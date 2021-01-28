
"use strict";
class Invader {
  constructor(canvas, x, y, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.size = 40;
    this.y = y; //// this.y = canvas.height + this.size;
    this.x = x;
    this.speed = speed;
    this.direction = 1;
    
  }


   draw() {
    const img = document.createElement("img");
    img.src = "img/greeninvader.png"
    this.ctx.drawImage(img, this.x, this.y, this.size, this.size); 
    /*
    this.ctx.fillStyle = "#ffff27";
    this.ctx.fillRect(this.x, this.y, this.size, this.size);*/
  } 



  handleScreenCollision() {
    this.x = this.x + this.direction * this.speed;
    const screenLeft = 0;
    const screenRight = this.canvas.width;

    const armyLeft = this.x;
    const armyRight = this.x + this.size;

    if (armyRight > screenRight) {this.direction = -1; this.y +=50;}
    else if (armyLeft < screenLeft) this.direction = 1;
  }

  updatePosition() {
    this.x= this.x + this.speed*this.direction; 
    this.y = this.y ;
  }

  isInsideScreen() {
    // if x plus half of its size is smaller then 0 return
    return this.y + this.size / 2 > 0;
  }
}