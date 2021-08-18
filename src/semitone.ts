import { isSimpleAccidental, SimpleAccidental } from './accidental';
import { heightenPitch, lowerPitch, Note } from './note';
import { getNoteProgressions } from './progression';
import { getScale, scaleIntervals, scaleNames } from './scale';
import {
  Augmented,
  Diminished,
  Fourth,
  HalfDiminished,
  isNaturalNote,
  Major,
  Minor,
  NaturalNote,
  Second,
  Seventh,
  Suspended,
  symbols,
} from './symbols';

export { getNoteProgressions, getScale, scaleNames, symbols };

export type Chord =
  | [root: Note, third: Note, fifth: Note]
  | [root: Note, third: Note, fifth: Note, seventh: Note];
export type ChordAbbreviation = `${NaturalNote}${SimpleAccidental | ''}${
  | ChordQuality
  | SeventhChordQuality
  | ChordSuspension
  | ''}`;
type ChordQuality = Minor | Augmented | Diminished;
type SeventhChordQuality =
  | `${Major}${Seventh}`
  | `${Seventh}`
  | `${Minor}${Seventh}`
  | `${Diminished}${Seventh}`
  | `${HalfDiminished}${Seventh}`;
type ChordSuspension = `${Suspended}${Second | Fourth}`;

export function getChord(
  chordAbbreviation: ChordAbbreviation,
): Chord | undefined {
  const parsedChord = parseChordAbbreviation(chordAbbreviation);

  if (!parsedChord) {
    return undefined;
  }

  const { note, accidental, quality, suspension } = parsedChord;

  const [root, second, third, fourth, fifth, , seventh] = getNoteProgressions(
    `${note}${accidental ?? ''}`,
    scaleIntervals.ionian,
  );

  return quality === 'm'
    ? [root, lowerPitch(third), fifth]
    : quality === 'dim'
    ? [root, lowerPitch(third), lowerPitch(fifth)]
    : quality === 'aug'
    ? [root, third, heightenPitch(fifth)]
    : quality === 'maj7'
    ? [root, third, fifth, seventh]
    : quality === '7'
    ? [root, third, fifth, lowerPitch(seventh)]
    : quality === 'm7'
    ? [root, lowerPitch(third), fifth, lowerPitch(seventh)]
    : quality === 'dim7'
    ? [
        root,
        lowerPitch(third),
        lowerPitch(fifth),
        lowerPitch(lowerPitch(seventh)),
      ]
    : quality === '⦰7'
    ? [root, lowerPitch(third), lowerPitch(fifth), lowerPitch(seventh)]
    : suspension === 'sus2'
    ? [root, second, fifth]
    : suspension === 'sus4'
    ? [root, fourth, fifth]
    : [root, third, fifth];
}

type ParsedChordAbbreviation = {
  note: NaturalNote;
  accidental?: SimpleAccidental;
  quality?: ChordQuality | SeventhChordQuality;
  suspension?: ChordSuspension;
};

function parseChordAbbreviation(
  chordAbbreviation: ChordAbbreviation,
): ParsedChordAbbreviation | undefined {
  let note: NaturalNote | undefined;
  let accidental: SimpleAccidental | undefined;
  let quality: ChordQuality | SeventhChordQuality | undefined;
  let suspension: ChordSuspension | undefined;

  let currentChars: string = '';

  for (const char of chordAbbreviation) {
    currentChars = currentChars + char;

    if (!note && isNaturalNote(currentChars)) {
      note = currentChars;
      currentChars = '';
    }

    if (!accidental && isSimpleAccidental(currentChars)) {
      accidental = currentChars;
      currentChars = '';
    }
  }

  if (isSeventhChordQuality(currentChars) || isChordQuality(currentChars)) {
    quality = currentChars;
    currentChars = '';
  }

  if (isChordSuspension(currentChars)) {
    suspension = currentChars;
    currentChars = '';
  }

  if (!note) {
    return;
  }

  return {
    note,
    accidental,
    quality,
    suspension,
  };
}

function isChordQuality(string: string): string is ChordQuality {
  return (
    string === symbols.minor ||
    string === symbols.diminished ||
    string === symbols.augmented
  );
}

function isSeventhChordQuality(string: string): string is SeventhChordQuality {
  return (
    string === `${symbols.major}${symbols.seventh}` ||
    string === symbols.seventh ||
    string === `${symbols.minor}${symbols.seventh}` ||
    string === `${symbols.diminished}${symbols.seventh}` ||
    string === `${symbols.halfDiminished}${symbols.seventh}`
  );
}

function isChordSuspension(string: string): string is ChordSuspension {
  return (
    string === `${symbols.suspended}${symbols.second}` ||
    string === `${symbols.suspended}${symbols.fourth}`
  );
}
