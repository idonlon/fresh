var cheby = new Tone.Chebyshev(50);

var duoSynth = new Tone.DuoSynth(
{
	"voice1":{
		"volume":-10,
		"portamento":0,
		"oscillator":{
			"type":"sine"
		},
		"filterEnvelope":{
			"attack":0.01,
			"decay":0,
			"sustain":1,
			"release":0.5
		},
		"envelope":{
			"attack":0.01,
			"decay":0,
			"sustain":1,
			"release":0.5
		},

		"filterEnvelope":{
			"attack":0.1,
			"decay":10,
			"sustain":10,
			"release":5
		},
		"vibratoAmount":2,
		"vibratoRate":10
	}
}).chain(cheby, Tone.Master);
$("#diamonds").click(function() {
	duoSynth.triggerAttackRelease("C4", "2n");

});

