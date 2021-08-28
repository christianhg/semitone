import { isSimpleAccidental, SimpleAccidental } from './accidental';
import { heightenPitch, lowerPitch, Note } from './note';
import { getNoteProgressions } from './progression';
import { ChordQuality, isChordQuality, qualityOperations } from './quality';
import { getScale, scaleIntervals, scaleNames } from './scale';
import { isNaturalNote, NaturalNote, symbols } from './symbols';

export { getNoteProgressions, getScale, scaleNames, symbols };

export type Chord =
  | [root: Note, third: Note, fifth: Note]
  | [root: Note, third: Note, fifth: Note, seventh: Note];
export type ChordAbbreviation = `${NaturalNote}${SimpleAccidental | ''}${
  | ChordQuality
  | ''}`;

type ChordFactor =
  | 'root'
  | 'second'
  | 'third'
  | 'fourth'
  | 'fifth'
  | 'sixth'
  | 'seventh';

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

  const operations = quality ? qualityOperations[quality] : [];

  const chordFactors: Record<ChordFactor, Note | undefined> = {
    root,
    second: undefined,
    third,
    fourth: undefined,
    fifth,
    sixth: undefined,
    seventh: undefined,
  };

  operations.forEach(operation => {
    if (operation === 'added-second') {
      chordFactors.second = second;
    }
    if (operation === 'added-fourth') {
      chordFactors.fourth = fourth;
    }
    if (operation === 'added-sixth') {
      chordFactors.sixth = sixth;
    }
    if (operation === 'added-seventh') {
      chordFactors.seventh = seventh;
    }
    if (operation === 'removed-third') {
      chordFactors.third = undefined;
    }
    if (operation === 'raised-fifth') {
      chordFactors.fifth = heightenPitch(chordFactors.fifth!);
    }
    if (operation === 'lowered-third') {
      chordFactors.third = lowerPitch(chordFactors.third!);
    }
    if (operation === 'lowered-fifth') {
      chordFactors.fifth = lowerPitch(chordFactors.fifth!);
    }
    if (operation === 'lowered-seventh') {
      chordFactors.seventh = lowerPitch(chordFactors.seventh!);
    }
  });

  return Object.values(chordFactors).filter(
    chordFactor => chordFactor,
  ) as Chord;
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
