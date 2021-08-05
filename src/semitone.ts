export function getScale(note: Note, scaleName: ScaleName): Scale {
  const interval = scaleIntervals.get(scaleName)!;

  let scale: Scale = [note, note, note, note, note, note, note, note];

  let [currentNote, currentAccidental] = splitNote(note);
  let [nextNote, nextNoteOffset] = noteProgression.get(currentNote)!;

  for (let index = 0; index < interval.length; index++) {
    const step = interval[index];

    const accidental = offsetToAccidental.get(
      accidentalToOffset.get(currentAccidental)! +
        scaleStepToOffset.get(step)! -
        scaleStepToOffset.get(nextNoteOffset)!
    )!;

    scale[index + 1] = `${nextNote}${accidental}`;

    currentNote = nextNote;
    currentAccidental = accidental;
    [nextNote, nextNoteOffset] = noteProgression.get(currentNote)!;
  }

  return scale;
}

export const symbols = {
  naturalNotes: ["C", "D", "E", "F", "G", "A", "B"] as const,
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
type Accidental = Flat | Sharp | DoubleFlat | DoubleSharp | "";
export type Note = `${NaturalNote}${Accidental}`;

function splitNote(note: Note): [NaturalNote, Accidental] {
  const [naturalNote, accidental = ""] = note.split("") as [
    NaturalNote,
    Accidental
  ];
  return [naturalNote, accidental];
}

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
export type Scale = [Note, Note, Note, Note, Note, Note, Note, Note];

export const scaleNames = ["major"] as const;
type ScaleName = typeof scaleNames[number];
const scaleIntervals = new Map<ScaleName, ScaleInterval>([
  ["major", ["W", "W", "H", "W", "W", "W", "H"]],
]);

const noteProgression = new Map<NaturalNote, [NaturalNote, ScaleStep]>([
  ["C", ["D", "W"]],
  ["D", ["E", "W"]],
  ["E", ["F", "H"]],
  ["F", ["G", "W"]],
  ["G", ["A", "W"]],
  ["A", ["B", "W"]],
  ["B", ["C", "H"]],
]);

const accidentalToOffset = new Map<Accidental, number>([
  ["𝄫", -2],
  ["♭", -1],
  ["", 0],
  ["♯", 1],
  ["𝄪", 2],
]);

const offsetToAccidental = new Map<number, Accidental>([
  [-2, "𝄫"],
  [-1, "♭"],
  [0, ""],
  [1, "♯"],
  [2, "𝄪"],
]);

const scaleStepToOffset = new Map<ScaleStep, 1 | 2>([
  ["H", 1],
  ["W", 2],
]);
