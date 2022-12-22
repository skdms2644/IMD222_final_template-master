var maxCount = 5000;
var currentCount = 2;
var x = [];
var y = [];
var r = [];

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");

  x[0] = width / 10;
  y[0] = height / 10;
  r[0] = 10;
}

function draw() {
  clear();
  background("#000060");
  noStroke();

  var newR = random(1, 5);
  var newX = random(newR, width - newR);
  var newY = random(newR, height - newR);

  var closestDist = Number.MAX_VALUE;
  var closestIndex = 0;
  for (var i = 0; i < currentCount; i++) {
    var newDist = dist(newX, newY, x[i], y[i]);
    if (newDist < closestDist) {
      closestDist = newDist;
      closestIndex = i;
    }
  }

  fill("yellow");
  ellipse(newX, newY, newR * 1, newR * 1);
  line(newX, newY, x[closestIndex], y[closestIndex]);

  var angle = atan2(newY - y[closestIndex], newX - x[closestIndex]);

  x[currentCount] = x[closestIndex] + cos(angle) * (r[closestIndex] + newR);
  y[currentCount] = y[closestIndex] + sin(angle) * (r[closestIndex] + newR);
  r[currentCount] = newR;
  currentCount++;

  for (var i = 0; i < currentCount; i++) {
    fill("#" + Math.round(Math.random() * 0xffffff).toString(16));
    ellipse(x[i], y[i], r[i] * 3, r[i] * 3);
  }

  if (currentCount >= maxCount) noLoop();
}
