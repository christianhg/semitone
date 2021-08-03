export function getScale(note: Note, scaleName: ScaleName): Scale {
  const interval = scaleIntervals.get(scaleName)!;

  let scale: Scale = [note, note, note, note, note, note, note, note];

  let currentNoteIndex = noteIndexesMap.get(note)!;

  for (let index = 0; index < interval.length; index++) {
    const step = interval[index];
    const stepLength = step === "H" ? 1 : 2;
    const [note] = noteIndexes.find(
      ([_, index]) => index === currentNoteIndex + stepLength
    )!;

    currentNoteIndex = currentNoteIndex + stepLength;
    scale[index + 1] = note;
  }

  return scale;
}

const symbols = {
  naturalNotes: ["A", "B", "C", "D", "E", "F", "G"] as const,
  flat: "♭" as const,
  sharp: "♯" as const,
  augmented: "+" as const,
  diminished: "o" as const,
  doubleFlat: "𝄫" as const,
  doubleSharp: "𝄪" as const,
};

type NaturalNote = typeof symbols.naturalNotes[number];
type Flat = typeof symbols.flat;
type Sharp = typeof symbols.sharp;
type Augmented = typeof symbols.augmented;
type Diminished = typeof symbols.diminished;
type DoubleFlat = typeof symbols.doubleFlat;
type DoubleSharp = typeof symbols.doubleSharp;
export type Note = `${NaturalNote}${"" | Flat | Sharp}`;

type ScaleStep = "W" | "H";
type ScaleInterval = [
  ScaleStep,
  ScaleStep,
  ScaleStep,
  ScaleStep,
  ScaleStep,
  ScaleStep,
  ScaleStep
];
type ScaleName = "major";
export type Scale = [Note, Note, Note, Note, Note, Note, Note, Note];

const scaleIntervals = new Map<ScaleName, ScaleInterval>([
  ["major", ["W", "W", "H", "W", "W", "W", "H"]],
]);

const noteIndexesMap = new Map<Note, number>([
  ["C", 0],
  ["B♯", 0],
  ["C♯", 1],
  ["D♭", 1],
  ["D", 2],
  ["D♯", 3],
  ["E♭", 3],
  ["E", 4],
  ["F♭", 4],
  ["F", 5],
  ["F♯", 6],
  ["G♭", 6],
  ["G", 7],
  ["G♯", 8],
  ["A♭", 8],
  ["A", 9],
  ["A♯", 10],
  ["B♭", 10],
  ["B", 11],
  ["C♭", 11],
]);

const noteIndexes: [Note, number][] = [
  ["C", 0],
  ["B♯", 0],
  ["C♯", 1],
  ["D♭", 1],
  ["D", 2],
  ["D♯", 3],
  ["E♭", 3],
  ["E", 4],
  ["F♭", 4],
  ["F", 5],
  ["F♯", 6],
  ["G♭", 6],
  ["G", 7],
  ["G♯", 8],
  ["A♭", 8],
  ["A", 9],
  ["A♯", 10],
  ["B♭", 10],
  ["B", 11],
  ["C♭", 11],
  ["C", 12],
  ["B♯", 12],
  ["C♯", 13],
  ["D♭", 13],
  ["D", 14],
  ["D♯", 15],
  ["E♭", 15],
  ["E", 16],
  ["F♭", 16],
  ["F", 17],
  ["F♯", 18],
  ["G♭", 18],
  ["G", 19],
  ["G♯", 20],
  ["A♭", 20],
  ["A", 21],
  ["A♯", 22],
  ["B", 23],
  ["B♭", 23],
  ["C♭", 23],
];
