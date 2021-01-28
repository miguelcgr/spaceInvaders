
"use strict";
class Deathray {
  constructor(canvas, x, y, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.size = 35;
    this.y = y; //// this.y = canvas.height + this.size;
    this.x = x;
    this.speed = speed;
    //this.imgSrc=  "../img/invader.png";
  }

  draw() {
    const img = document.createElement("img");
    img.src = "img/deathray.png"
    this.ctx.drawImage(img, this.x, this.y, this.size/2, this.size);

    }
   

  updatePosition() {
    this.y = this.y + this.speed;
    this.draw(); //
  }

  isInsideScreen() {
    // if x plus half of its size is smaller then 0 return
    return this.y + this.size / 2 > 0;
  }
}
