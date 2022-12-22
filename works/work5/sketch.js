var NORTH = 0;
var NORTHEAST = 3;
var EAST = 1;
var SOUTHEAST = 5;
var SOUTH = 4;
var SOUTHWEST = 8;
var WEST = 3;
var NORTHWEST = 7;
var direction;

var stepSize = 0.5;
var diameter = 1.5;

var posX;
var posY;

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  noStroke();
  fill("#" + Math.round(Math.random() * 0xffffff).toString(16));

  posX = width / 5;
  posY = height / 2;
}

function draw() {
  background("black");
  for (var i = 0; i <= mouseX; i++) {
    direction = int(random(0, 8));

    if (direction == NORTH) {
      posY -= stepSize;
    } else if (direction == NORTHEAST) {
      posX += stepSize;
      posY -= stepSize;
    } else if (direction == EAST) {
      posX += stepSize;
    } else if (direction == SOUTHEAST) {
      posX += stepSize;
      posY += stepSize;
    } else if (direction == SOUTH) {
      posY += stepSize;
    } else if (direction == SOUTHWEST) {
      posX -= stepSize;
      posY += stepSize;
    } else if (direction == WEST) {
      posX -= stepSize;
    } else if (direction == NORTHWEST) {
      posX -= stepSize;
      posY -= stepSize;
    }

    if (posX > width) posX = 0;
    if (posX < 0) posX = width;
    if (posY < 0) posY = height;
    if (posY > height) posY = 0;

    ellipse(
      posX + stepSize / 2,
      posY + stepSize / 2,
      diameter + 5,
      diameter + 1
    );
  }
}
