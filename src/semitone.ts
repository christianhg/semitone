type Scale = {
  name: ScaleName;
  alias?: ScaleAlias;
  interval: ScaleInterval;
};

export function getScale(scaleName: ScaleName | ScaleAlias): Scale {
  const name = isScaleAlias(scaleName)
    ? scaleAliasToName[scaleName]
    : scaleName;
  const interval = scaleIntervals[name];

  return {
    name,
    alias: scaleNameToAlias[name],
    interval,
  };
}

export function getNoteProgressions(
  note: Note,
  interval: ScaleInterval
): ScaleNotes {
  let scale: ScaleNotes = [note, note, note, note, note, note, note, note];

  let [currentNote, currentAccidental] = splitNote(note);
  let [nextNote, nextNoteOffset] = noteProgression[currentNote];

  for (let index = 0; index < interval.length; index++) {
    const step = interval[index];

    const offset =
      accidentalToOffset[currentAccidental] +
      scaleStepToOffset[step] -
      scaleStepToOffset[nextNoteOffset];

    const accidental = offsetToAccidental.get(offset)!;

    scale[index + 1] = `${nextNote}${accidental}`;

    currentNote = nextNote;
    currentAccidental = accidental;
    [nextNote, nextNoteOffset] = noteProgression[currentNote];
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
export type ScaleNotes = [Note, Note, Note, Note, Note, Note, Note, Note];

export const scaleNames = [
  "ionian",
  "dorian",
  "phrygian",
  "lydian",
  "mixolydian",
  "aeolian",
  "locrian",
] as const;
export const scaleAliases = ["major", "natural-minor"] as const;

function isScaleAlias(
  scaleName: ScaleAlias | ScaleName
): scaleName is ScaleAlias {
  return scaleAliases.includes(scaleName as any);
}

type ScaleName = typeof scaleNames[number];
type ScaleAlias = typeof scaleAliases[number];

const scaleAliasToName: Record<ScaleAlias, ScaleName> = {
  major: "ionian",
  "natural-minor": "aeolian",
} as const;

const scaleNameToAlias: Record<ScaleName, ScaleAlias | undefined> = {
  ionian: "major",
  dorian: undefined,
  phrygian: undefined,
  lydian: undefined,
  mixolydian: undefined,
  aeolian: "natural-minor",
  locrian: undefined,
} as const;

export const scaleIntervals: Record<ScaleName, ScaleInterval> = {
  ionian: ["W", "W", "H", "W", "W", "W", "H"],
  dorian: ["W", "H", "W", "W", "W", "H", "W"],
  phrygian: ["H", "W", "W", "W", "H", "W", "W"],
  lydian: ["W", "W", "W", "H", "W", "H", "W"],
  mixolydian: ["W", "W", "H", "W", "W", "H", "W"],
  aeolian: ["W", "H", "W", "W", "H", "W", "W"],
  locrian: ["H", "W", "W", "H", "W", "W", "W"],
};

const noteProgression: Record<NaturalNote, [NaturalNote, ScaleStep]> = {
  C: ["D", "W"],
  D: ["E", "W"],
  E: ["F", "H"],
  F: ["G", "W"],
  G: ["A", "W"],
  A: ["B", "W"],
  B: ["C", "H"],
};

const accidentalToOffset: Record<Accidental, -2 | -1 | 0 | 1 | 2> = {
  "𝄫": -2,
  "♭": -1,
  "": 0,
  "♯": 1,
  "𝄪": 2,
} as const;

const offsetToAccidental = new Map<number, Accidental>([
  [-2, "𝄫"],
  [-1, "♭"],
  [0, ""],
  [1, "♯"],
  [2, "𝄪"],
]);

const scaleStepToOffset: Record<ScaleStep, 1 | 2> = {
  H: 1,
  W: 2,
} as const;
