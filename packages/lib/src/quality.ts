import { ChordFactor } from './factor';
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

export type OperationType = 'lowered' | 'raised' | 'added' | 'removed';
export type Operation = [OperationType, ChordFactor];

export const qualityOperations: Record<ChordQuality, Operation[]> = {
  m: [['lowered', 'third']],
  dim: [
    ['lowered', 'third'],
    ['lowered', 'fifth'],
  ],
  aug: [['raised', 'fifth']],
  '6': [['added', 'sixth']],
  maj7: [['added', 'seventh']],
  '7': [
    ['added', 'seventh'],
    ['lowered', 'seventh'],
  ],
  '7sus': [
    ['removed', 'third'],
    ['added', 'fourth'],
    ['added', 'seventh'],
    ['lowered', 'seventh'],
  ],
  m7: [
    ['lowered', 'third'],
    ['added', 'seventh'],
    ['lowered', 'seventh'],
  ],
  dim7: [
    ['lowered', 'third'],
    ['lowered', 'fifth'],
    ['added', 'seventh'],
    ['lowered', 'seventh'],
    ['lowered', 'seventh'],
  ],
  aug7: [
    ['raised', 'fifth'],
    ['added', 'seventh'],
    ['lowered', 'seventh'],
  ],
  '⦰7': [
    ['lowered', 'third'],
    ['lowered', 'fifth'],
    ['added', 'seventh'],
    ['lowered', 'seventh'],
  ],
  sus2: [
    ['removed', 'third'],
    ['added', 'second'],
  ],
  sus4: [
    ['removed', 'third'],
    ['added', 'fourth'],
  ],
};

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
