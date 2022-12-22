var colorCount = 20;
var hueValues = [];
var saturationValues = [];
var brightnessValues = [];
var actRandomSeed = 0;
var alphaValue = 255;

function setup() {
  colorMode(RGB, 150);
  noStroke();
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
}

function draw() {
  noLoop();
  background(0);
  randomSeed(actRandomSeed);

  for (var i = 0; i < colorCount; i++) {
    if (i % 4 == 0) {
      hueValues[i] = random(250);
      saturationValues[i] = 100;
      brightnessValues[i] = random(100);
    } else {
      hueValues[i] = 195;
      saturationValues[i] = random(200);
      brightnessValues[i] = 100;
    }
  }

  var counter = 0;
  var rowCount = int(random(5, 10));
  var rowHeight = height / rowCount;

  for (var i = rowCount; i >= 0; i--) {
    var partCount = i + 10;
    var parts = [];

    for (var ii = 0; ii < partCount; ii++) {
      if (random() < 0.075) {
        var fragments = int(random(2, 10));
        partCount = partCount + fragments;
        for (var iii = 0; iii < fragments; iii++) {
          parts.push(random(5));
        }
      } else {
        parts.push(random(2, 10));
      }
    }

    var sumPartsTotal = 0;
    for (var ii = 0; ii < partCount; ii++) {
      sumPartsTotal += parts[ii];
    }

    var sumPartsNow = 0;
    for (var ii = 0; ii < parts.length; ii++) {
      sumPartsNow += parts[ii];

      var x = map(sumPartsNow, i + 3, sumPartsTotal, 0, width);
      var y = rowHeight * i;
      var w = -map(parts[ii], i - 10, sumPartsTotal, 0, width);
      var h = rowHeight;

      var index = counter % colorCount;
      var col1 = color(255);
      var col2 = color(
        hueValues[index],
        saturationValues[index],
        brightnessValues[index],
        alphaValue
      );
      gradient(x, y, w, h, col1, col2);

      counter++;
    }
  }
}

function gradient(x, y, w, h, c1, c2) {
  var ctx = drawingContext;
  var grd = ctx.createLinearGradient(x, y, x, y + h);
  grd.addColorStop(0, c1.toString());
  grd.addColorStop(1, c2.toString());
  ctx.fillStyle = grd;
  ctx.fillRect(x, y, w, h);
}

function mousePressed() {
  actRandomSeed = random(100000);
  loop();
}
