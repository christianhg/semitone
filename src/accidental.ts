import { DoubleFlat, DoubleSharp, Flat, Sharp, symbols } from "./symbols";

export type Accidental = Flat | Sharp | DoubleFlat | DoubleSharp | "";

export function isAccidental(string: string): string is Accidental {
  return (
    string === symbols.doubleFlat ||
    string === symbols.flat ||
    string === symbols.sharp ||
    string === symbols.doubleSharp
  );
}

export const accidentalToOffset: Record<Accidental, -2 | -1 | 0 | 1 | 2> = {
  "𝄫": -2,
  "♭": -1,
  "": 0,
  "♯": 1,
  "𝄪": 2,
} as const;

export const offsetToAccidental = new Map<number, Accidental>([
  [-2, "𝄫"],
  [-1, "♭"],
  [0, ""],
  [1, "♯"],
  [2, "𝄪"],
]);
