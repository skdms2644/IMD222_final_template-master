var sliders;

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  sliders = [];
  sliders.push(new SliderRose(width / 1, height / 2));
}

function draw() {
  background("#000060");

  sliders.forEach(function (d) {
    d.update();
  });
}

function mousePressed() {
  sliders.push(new SliderRose(mouseX, mouseY));
}

function SliderRose(_x, _y) {
  this.x1 = _x;
  this.y1 = _y;
  var sliders = [];
  var sinAngle = 10;
  var counter = 0;
  var roseRadius = random(20, 100);
  var skip = 10;
  for (var i = 0; i < 360; i += skip) {
    var sliderAngle = radians(i * 1.5);
    var x2 = cos(sliderAngle) * roseRadius * 0.9;
    var y2 = sin(sliderAngle) * roseRadius * 1.5;
    sliders[counter] = createSlider(0, 230, 100);
    sliders[counter].position(this.x1 + x2, this.y1 + y2);
    sliders[counter].style("width", roseRadius * 2 + "px");
    counter++;
  }

  this.update = function () {
    var offset = 0;
    for (var i = 0; i < sliders.length; i++) {
      var x = map(sin(sinAngle + offset), -1, 1, 0, 250);
      sliders[i].value(x);
      offset += 0.1;
    }
    sinAngle += 0.1;
  };
}
