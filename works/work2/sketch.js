"use strict";

var sketch = function (p) {
  var agents = [];
  var agentCount = 50;
  var noiseScale = 10;
  var noiseStrength = 1;
  var noiseZRange = 0.8;
  var noiseZVelocity = 0.1;
  var overlayAlpha = 20;
  var agentAlpha = 80;
  var strokeWidth = 0.7;
  var drawMode = 1;
  let boundingRects = document;

  // let canvas = createCanvas(boundingRects.width, boundingRects.height);
  // canvas.parent("p5Canvas");

  p.setup = function () {
    // p.getElementById("p5Canvas")
    // p.getBoundingClientRect();
    p.createCanvas(p.windowWidth, p.windowHeight);

    for (var i = 0; i < agentCount; i++) {
      agents[i] = new Agent(noiseZRange);
    }
  };

  p.draw = function () {
    p.fill(20, overlayAlpha);
    p.noStroke();
    // p.strokeWeight(40);
    // p.stroke(51);
    p.rect(0, 0, p.width, p.height);

    p.stroke("#" + Math.round(Math.random() * 0xffffff).toString(16));
    // p.strokeWeight(4);
    for (var i = 0; i < agentCount; i++) {
      if (drawMode == 1) {
        agents[i].update1(
          strokeWidth,
          noiseScale,
          noiseStrength,
          noiseZVelocity
        );
      } else {
        agents[i].update2(
          strokeWidth,
          noiseScale,
          noiseStrength,
          noiseZVelocity
        );
      }
    }
  };

  p.keyReleased = function () {
    if (p.key == "s" || p.key == "S") p.saveCanvas(gd.timestamp(), "png");
    if (p.key == "1") drawMode = 1;
    if (p.key == "2") drawMode = 2;
    if (p.key == " ") {
      var newNoiseSeed = p.floor(p.random(10000));
      console.log("newNoiseSeed", newNoiseSeed);
      p.noiseSeed(newNoiseSeed);
    }
    if (p.keyCode == p.DELETE || p.keyCode == p.BACKSPACE) p.background(255);
  };
};

var myp5 = new p5(sketch);
