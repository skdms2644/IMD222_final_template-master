function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  strokeCap(SQUARE);
}

function draw() {
  background("#000060");
  translate(width / 2, height / 2);

  var circleResolution = int(map(mouseY, 0, height, 0, 150));
  var radius = mouseX - width / 10;
  var angle = TAU / circleResolution;

  stroke("#" + Math.round(Math.random() * 0xffffff).toString(16));
  strokeWeight(mouseY / 10);

  for (var i = 0; i <= circleResolution; i++) {
    var x = cos(angle * i) * radius;
    var y = tan(angle * i) * radius;
    line(0, 0, x, y);
  }
}
