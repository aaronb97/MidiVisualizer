import WebMidi from "webmidi";

WebMidi.enable(function (err) {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    console.log("WebMidi enabled!");
    const input = WebMidi.inputs[0];
    input.addListener("noteon", "all", function (e) {
      console.log(
        "Received 'noteon' message (" + e.note.name + e.note.octave + ")."
      );
    });
  }
});
