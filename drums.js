function bump() {
  // dPx = map(del.x, 0, windowWidth, 0, 155);
  dPx = chorus.delayTime;

  if (del.x < 300) {
    drums = map(chorus.delayTime, 0, windowWidth, 20, 100);
  } 
  else if (del.x > 300) {
    drums = map(chorus.delayTime, 0, windowWidth, 0, 19);
  }

  console.log(dPx);
  var drums = new Tone.DrumSynth().chain(chorus, Tone.Master);

  function onLoop(time, note) {
    drums.triggerAttackRelease(note, "16n", time);
  }

  var pattern = new Tone.Pattern(onLoop, ["D1", "D2"]).stop(0);
    // Tone.Transport.bpm = 190;

    $("#del").click(function() {
      pattern.start();
    });

    $("#del").dblclick(function() {
      pattern.stop();
    });
  }
