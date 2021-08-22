import {
  Augmented,
  Diminished,
  Fourth,
  HalfDiminished,
  Major,
  Minor,
  Second,
  Seventh,
  Sixth,
  Suspended,
  symbols,
} from './symbols';

export type ChordQuality =
  | Minor
  | Augmented
  | Diminished
  | Sixth
  | `${Major}${Seventh}`
  | `${Seventh}`
  | `${Minor}${Seventh}`
  | `${Diminished}${Seventh}`
  | `${Augmented}${Seventh}`
  | `${HalfDiminished}${Seventh}`
  | `${Seventh}${Suspended}`
  | `${Suspended}${Second | Fourth}`;

export function isChordQuality(string: string): string is ChordQuality {
  return (
    string === symbols.minor ||
    string === symbols.diminished ||
    string === symbols.augmented ||
    string === symbols.sixth ||
    string === `${symbols.major}${symbols.seventh}` ||
    string === symbols.seventh ||
    string === `${symbols.minor}${symbols.seventh}` ||
    string === `${symbols.diminished}${symbols.seventh}` ||
    string === `${symbols.augmented}${symbols.seventh}` ||
    string === `${symbols.halfDiminished}${symbols.seventh}` ||
    string === `${symbols.seventh}${symbols.suspended}` ||
    string === `${symbols.suspended}${symbols.second}` ||
    string === `${symbols.suspended}${symbols.fourth}`
  );
}
