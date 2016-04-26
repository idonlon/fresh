  //  ______   __     ______     __   __     ______   
    // /\  == \ /\ \   /\  __ \   /\ "-.\ \   /\  __ \  
    // \ \  _-/ \ \ \  \ \  __ \  \ \ \-.  \  \ \ \/\ \ 
    //  \ \_\    \ \_\  \ \_\ \_\  \ \_\\"\_\  \ \_____\
    //   \/_/     \/_/   \/_/\/_/   \/_/ \/_/   \/_____/

    var feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toMaster();

    var piano = new Tone.PolySynth(4, Tone.SimpleSynth, {
      "volume": -8,
      "oscillator": {
        "partials": [1, 2, 1],
      },
      "portamento": 0.05
    }).connect(feedbackDelay)

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


    //  __    __     ______     __         ______     _____     __  __   
    // /\ "-./  \   /\  ___\   /\ \       /\  __ \   /\  __-.  /\ \_\ \  
    // \ \ \-./\ \  \ \  __\   \ \ \____  \ \ \/\ \  \ \ \/\ \ \ \____ \ 
    //  \ \_\ \ \_\  \ \_____\  \ \_____\  \ \_____\  \ \____-  \/\_____\
    //   \/_/  \/_/   \/_____/   \/_____/   \/_____/   \/____/   \/_____/


    var autoWah = new Tone.AutoWah(50, 6, -20).toMaster();
    var tremolo = new Tone.Tremolo(3, 2.5).toMaster();

    var synth = new Tone.MonoSynth({
      "oscillator": {
        "type": "sawtooth"
      },
      "filter": {
        "Q": 3,
        "type": "highpass",
        "rolloff": -12
      },
      "envelope": {
        "attack": 0.001,
        "decay": 0.3,
        "sustain": 0,
        "release": 0.9
      },
      "filterEnvelope": {
        "attack": 0.001,
        "decay": 0.001,
        "sustain": 0,
        "release": 0.001,
        "baseFrequency": 800,
        "octaves": -1.2
      },
      "roomSize": 0.7,
      "dampening": 4300

    }).chain(autoWah, tremolo, Tone.Master);
    // }).toMaster();

    // var loop = new Tone.Sequence(function(when, note){
    // 	synth.triggerAttackRelease(note, "2n", when)
    // }, [["D4"] ,"C5", "A4"],[["C2"],"C1", "D3", "G4", "F3"]).stop(0);
    var loop = new Tone.Sequence(function(when, note) {
      synth.triggerAttackRelease(note, "2n", when)
    }, [
      ["C5", "A5"], "C5"
    ]).stop(0);


    $("#btn").click(function() {
      loop.start();
    });


    $("#btn").dblclick(function() {
      loop.stop();
    });

    // Tone.Transport.bpm = 190;
    Tone.Transport.start();