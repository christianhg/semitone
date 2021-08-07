import { getNoteProgressions, ScaleNotes, scaleIntervals } from "./semitone";

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
