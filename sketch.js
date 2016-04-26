var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

var delay = new Tone.FeedbackDelay("8n", 0.0);
var chorus = new Tone.Chorus(4, 0, 2);

var bumpX, bumpY;
var dPx;
// Circle variables for knob
var x = 160;
var y = 180;
var r = 40;

// Knob angle
var angle = 0;

// Offset angle for turning knob
var offsetAngle = 0;

function setup() {
  createCanvas(640, 360);
  setupSound();
  bump();


}

function draw() {
  background(255);
  dragCheck();
  knobCalc();

}

function dragCheck() {
 // Is it being dragged?
 if (dragging) {
  var dx = mouseX - x;
  var dy = mouseY - y;
  var mouseAngle = atan2(dy, dx);
  angle = mouseAngle - offsetAngle;
}

  // Fill according to state
  if (dragging) {
    fill (175);
  } 
  else {
    fill(255);
  }
}


function knobCalc() {
  var b = map(calcAngle, 0, TWO_PI, 0, 10);
  // Draw ellipse for kno


  push();
  translate(x, y);
  rotate(angle);
  fill(255,25,255);
  ellipse(0, 0, r*2, r*2);
  line(0, 0, r, 0);
  pop();
  fill(b);

  var calcAngle = 0; 
  if (angle < 0) {
    calcAngle = map(angle, -PI, 0, PI, 0);
  } 
  else if (angle > 0) {
    calcAngle = map(angle, 0, PI, TWO_PI, PI);
  }
  var b = map(calcAngle, 0, TWO_PI, 0, 10);
  //update delay feedback
  delay.feedback.value = b;

  // console.log(b);
}


function mousePressed() {
  // Did I click on slider?
  if (dist(mouseX, mouseY, x, y) < r) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    var dx = mouseX - x;
    var dy = mouseY - y;
    offsetAngle = atan2(dy, dx) - angle;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}


function setupSound() {
  var piano = new Tone.PolySynth(4, Tone.SimpleSynth, {
    "volume": -8,
    "oscillator": {
      "partials": [1, 2, 1],
    },
    "portamento": 0.05
  });

// piano.chain(Tone.Master);
piano.chain(delay,Tone.Master);

var cChord = ["E4", "B4", "G4"];
var dChord = ["C1", "C1", "F1", "D4", "D1"];
var gChord = ["E1", "E1", "E1", "E4"];
var pianoPart = new Tone.Part(function(time, chord) {
  piano.triggerAttackRelease(chord, "8n", time);
}, [
["0:0:2", cChord],
["4n", dChord],
["0:3", dChord],
["2n", gChord]
]).stop();
pianoPart.loop = true;
pianoPart.loopEnd = "1m";
pianoPart.humanize = true;


$("#btn2").click(function() {
  pianoPart.start();
});
$("#btn2").dblclick(function() {
  pianoPart.stop();
});

Tone.Transport.start();
}



