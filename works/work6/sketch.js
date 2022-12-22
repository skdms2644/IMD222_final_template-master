"use strict";

var drawMode = 1;

var img;

function preload() {
  img = loadImage("data/img.png");
}

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  print(img.width + " • " + img.height);
}

function draw() {
  background("skyblue");

  var mouseXFactor = map(mouseX, 0, width, 0.05, 1);
  var mouseYFactor = map(mouseY, 0, height, 0.05, 1);

  for (var gridX = 0; gridX < img.width; gridX++) {
    for (var gridY = 0; gridY < img.height; gridY++) {
      var tileWidth = width / img.width;
      var tileHeight = height / img.height;
      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;

      img.loadPixels();
      var c = color(img.get(gridX, gridY));
      var greyscale = round(
        red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071
      );

      switch (drawMode) {
        case 1:
          var w1 = map(greyscale, 0, 255, 15, 0.1);
          stroke(0);
          strokeWeight(w1 * mouseXFactor);
          line(posX, posY, posX + 5, posY + 5);
          break;
        case 2:
          fill(0);
          noStroke();
          var r2 = 1.1284 * sqrt(tileWidth * tileWidth * (1 - greyscale / 255));
          r2 *= mouseXFactor * 3;
          ellipse(posX, posY, r2, r2);
          break;
        case 3:
          var l3 = map(greyscale, 0, 255, 30, 0.1);
          l3 *= mouseXFactor;
          stroke(0);
          strokeWeight(10 * mouseYFactor);
          line(posX, posY, posX + l3, posY + l3);
          break;
        case 4:
          stroke(0);
          var w4 = map(greyscale, 0, 255, 10, 0);
          strokeWeight(w4 * mouseXFactor + 0.1);
          var l4 = map(greyscale, 0, 255, 35, 0);
          l4 *= mouseYFactor;
          push();
          translate(posX, posY);
          rotate((greyscale / 255) * PI);
          line(0, 0, 0 + l4, 0 + l4);
          pop();
          break;
        case 5:
          var w5 = map(greyscale, 0, 255, 5, 0.2);
          strokeWeight(w5 * mouseYFactor + 0.1);
          var c2 = color(img.get(min(gridX + 1, img.width - 1), gridY));
          stroke(c2);
          var greyscale2 = floor(
            red(c2) * 0.222 + green(c2) * 0.707 + blue(c2) * 0.071
          );
          var h5 = 50 * mouseXFactor;
          var d1 = map(greyscale, 0, 255, h5, 0);
          var d2 = map(greyscale2, 0, 255, h5, 0);
          line(posX - d1, posY + d1, posX + tileWidth - d2, posY + d2);
          break;
        case 6:
          var w6 = map(greyscale, 0, 255, 25, 0);
          noStroke();
          fill(c);
          ellipse(posX, posY, w6 * mouseXFactor, w6 * mouseXFactor);
          break;
        case 7:
          stroke(c);
          var w7 = map(greyscale, 0, 255, 5, 0.1);
          strokeWeight(w7);
          fill(255, 255 * mouseXFactor);
          push();
          translate(posX, posY);
          rotate((greyscale / 255) * PI * mouseYFactor);
          rect(0, 0, 15, 15);
          pop();
          break;
        case 8:
          noStroke();
          fill(greyscale, greyscale * mouseXFactor, 255 * mouseYFactor);
          rect(posX, posY, 3.5, 3.5);
          rect(posX + 4, posY, 3.5, 3.5);
          rect(posX, posY + 4, 3.5, 3.5);
          rect(posX + 4, posY + 4, 3.5, 3.5);
          break;
        case 9:
          stroke(255, greyscale, 0);
          noFill();
          push();
          translate(posX, posY);
          rotate((greyscale / 255) * PI);
          strokeWeight(1);
          rect(0, 0, 15 * mouseXFactor, 15 * mouseYFactor);
          var w9 = map(greyscale, 0, 255, 15, 0.1);
          strokeWeight(w9);
          stroke(0, 70);
          ellipse(0, 0, 10, 5);
          pop();
          break;
      }
    }
  }
}

function keyReleased() {
  if (key == "1") drawMode = 1;
  if (key == "2") drawMode = 2;
  if (key == "3") drawMode = 3;
  if (key == "4") drawMode = 4;
  if (key == "5") drawMode = 5;
  if (key == "6") drawMode = 6;
  if (key == "7") drawMode = 7;
  if (key == "8") drawMode = 8;
  if (key == "9") drawMode = 9;
}
