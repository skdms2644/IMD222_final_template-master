var drawMode = 1;

var col;
var x = 0;
var y = 0;
var stepSize = 10;
var lineLength = 50;

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  background(0);
  // col = color(random(255), random(255), random(255), random(100));
  col = color("#" + Math.round(Math.random() * 0xffffff).toString(16));
  x = mouseX;
  y = mouseY;
  cursor(CROSS);
}

function draw() {
  if (mouseIsPressed && mouseButton == LEFT) {
    var d = dist(x, y, mouseX, mouseY);

    if (d > stepSize) {
      var angle = atan2(mouseY - y, mouseX - x);

      push();
      translate(x, y);
      rotate(angle);
      stroke(col);
      if (frameCount % 10 == 0) stroke(200);
      line(5, 5, 5, (lineLength * random(0.95, 1) * d) / 10);
      pop();

      if (drawMode == 1) {
        x = x + cos(angle) * stepSize;
        y = y + sin(angle) * stepSize;
      } else {
        x = mouseX;
        y = mouseY;
      }
    }
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
  col = color(random(255), random(255), random(255), random(100));
  lineLength = random(15, 50);
}
