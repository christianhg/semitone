export const symbols = {
  naturalNotes: ["C", "D", "E", "F", "G", "A", "B"] as const,
  flat: "♭" as const,
  sharp: "♯" as const,
  augmented: "aug" as const,
  diminished: "dim" as const,
  doubleFlat: "𝄫" as const,
  doubleSharp: "𝄪" as const,
  minor: "m" as const,
};

export type NaturalNote = typeof symbols.naturalNotes[number];
export type Flat = typeof symbols.flat;
export type Sharp = typeof symbols.sharp;
export type Augmented = typeof symbols.augmented;
export type Diminished = typeof symbols.diminished;
export type DoubleFlat = typeof symbols.doubleFlat;
export type DoubleSharp = typeof symbols.doubleSharp;
export type Minor = typeof symbols.minor;

export function isNaturalNote(string: string): string is NaturalNote {
  return symbols.naturalNotes.includes(string as any);
}
