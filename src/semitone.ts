import { isSimpleAccidental, SimpleAccidental } from './accidental';
import { ChordFactor } from './factor';
import { heightenPitch, lowerPitch, Note } from './note';
import { getNoteProgressions } from './progression';
import {
  ChordQuality,
  isChordQuality,
  Operation,
  qualityOperations,
} from './quality';
import { getScale, scaleIntervals, scaleNames } from './scale';
import { isNaturalNote, NaturalNote, symbols } from './symbols';

export { getNoteProgressions, getScale, scaleNames, symbols };

export type Chord =
  | [root: Note, third: Note, fifth: Note]
  | [root: Note, third: Note, fifth: Note, seventh: Note];
export type ChordAbbreviation = `${NaturalNote}${SimpleAccidental | ''}${
  | ChordQuality
  | ''}`;

export function getChord(
  chordAbbreviation: ChordAbbreviation,
): Chord | undefined {
  const parsedChord = parseChordAbbreviation(chordAbbreviation);

  if (!parsedChord) {
    return undefined;
  }

  const { note, accidental, quality } = parsedChord;

  const [root, second, third, fourth, fifth, sixth, seventh] =
    getNoteProgressions(`${note}${accidental ?? ''}`, scaleIntervals.ionian);

  const defaultNotes: Record<ChordFactor, Note> = {
    root,
    second,
    third,
    fourth,
    fifth,
    sixth,
    seventh,
  };

  const operations = quality ? qualityOperations[quality] : [];

  const defaultOperations: Operation[] = [
    ['added', 'root'],
    ['added', 'third'],
    ['added', 'fifth'],
  ];

  const chordFactors: Record<ChordFactor, Note | undefined> = {
    root: undefined,
    second: undefined,
    third: undefined,
    fourth: undefined,
    fifth: undefined,
    sixth: undefined,
    seventh: undefined,
  };

  [...defaultOperations, ...operations].forEach(([type, factor]) => {
    const note = chordFactors[factor];

    if (type === 'added') {
      chordFactors[factor] = defaultNotes[factor];
    } else if (type === 'removed') {
      chordFactors[factor] = undefined;
    } else if (type === 'lowered') {
      chordFactors[factor] = note
        ? lowerPitch(note)
        : lowerPitch(defaultNotes[factor]);
    } else if (type === 'raised') {
      chordFactors[factor] = note
        ? heightenPitch(note)
        : heightenPitch(defaultNotes[factor]);
    }
  });

  return Object.values(chordFactors).filter(note => note) as Chord;
}

type ParsedChordAbbreviation = {
  note: NaturalNote;
  accidental?: SimpleAccidental;
  quality?: ChordQuality;
};

function parseChordAbbreviation(
  chordAbbreviation: ChordAbbreviation,
): ParsedChordAbbreviation | undefined {
  let note: NaturalNote | undefined;
  let accidental: SimpleAccidental | undefined;
  let quality: ChordQuality | undefined;

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

  if (!note) {
    return;
  }

  if (isChordQuality(currentChars)) {
    quality = currentChars;
  }

  return {
    note,
    accidental,
    quality,
  };
}
