import {
  getNoteProgressions,
  ScaleNotes,
  scaleIntervals,
  getChord,
  ChordAbbreviation,
  Chord,
} from "./semitone";

test(getChord.name, () => {
  const chords = new Map<ChordAbbreviation, Chord>([
    ["C", ["C", "E", "G"]],
    ["Am", ["A", "C", "E"]],
    ["Caug", ["C", "E", "G♯"]],
  ]);

  [...chords.entries()].forEach(([abbreviation, chord]) => {
    expect(getChord(abbreviation)).toEqual(chord);
  });
});

test(getNoteProgressions.name, () => {
  const majorScales: ScaleNotes[] = [
    ["C", "D", "E", "F", "G", "A", "B", "C"],
    ["D", "E", "F♯", "G", "A", "B", "C♯", "D"],
    ["E", "F♯", "G♯", "A", "B", "C♯", "D♯", "E"],
    ["F", "G", "A", "B♭", "C", "D", "E", "F"],
    ["G", "A", "B", "C", "D", "E", "F♯", "G"],
    ["A", "B", "C♯", "D", "E", "F♯", "G♯", "A"],
    ["B", "C♯", "D♯", "E", "F♯", "G♯", "A♯", "B"],
  ];

  majorScales.forEach((majorScale) => {
    expect(
      getNoteProgressions(majorScale[0], scaleIntervals["ionian"])
    ).toEqual(majorScale);
  });
});
