import { getScale, Scale } from "./semitone";

test(getScale.name, () => {
  const majorScales: Scale[] = [
    ["C", "D", "E", "F", "G", "A", "B", "C"],
    ["D", "E", "F♯", "G", "A", "B", "C♯", "D"],
    ["E", "F♯", "G♯", "A", "B", "C♯", "D♯", "E"],
    ["F", "G", "A", "B♭", "C", "D", "E", "F"],
    ["G", "A", "B", "C", "D", "E", "F♯", "G"],
    ["A", "B", "C♯", "D", "E", "F♯", "G♯", "A"],
    ["B", "C♯", "D♯", "E", "F♯", "G♯", "A♯", "B"],
  ];

  majorScales.forEach((majorScale) => {
    expect(getScale(majorScale[0], "major")).toEqual(majorScale);
  });
});
