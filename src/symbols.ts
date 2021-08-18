export const symbols = {
  naturalNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const,
  flat: '♭' as const,
  sharp: '♯' as const,
  augmented: 'aug' as const,
  diminished: 'dim' as const,
  halfDiminished: '⦰' as const,
  doubleFlat: '𝄫' as const,
  doubleSharp: '𝄪' as const,
  major: 'maj' as const,
  minor: 'm' as const,
  seventh: '7' as const,
  suspended: 'sus' as const,
  second: '2' as const,
  fourth: '4' as const,
};

export type NaturalNote = typeof symbols.naturalNotes[number];
export type Flat = typeof symbols.flat;
export type Sharp = typeof symbols.sharp;
export type Augmented = typeof symbols.augmented;
export type Diminished = typeof symbols.diminished;
export type HalfDiminished = typeof symbols.halfDiminished;
export type DoubleFlat = typeof symbols.doubleFlat;
export type DoubleSharp = typeof symbols.doubleSharp;
export type Major = typeof symbols.major;
export type Minor = typeof symbols.minor;
export type Seventh = typeof symbols.seventh;
export type Second = typeof symbols.second;
export type Fourth = typeof symbols.fourth;
export type Suspended = typeof symbols.suspended;

export function isNaturalNote(string: string): string is NaturalNote {
  return symbols.naturalNotes.includes(string as any);
}
