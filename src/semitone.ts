import { isSimpleAccidental, SimpleAccidental } from './accidental';
import { heightenPitch, lowerPitch, Note } from './note';
import { getNoteProgressions } from './progression';
import { ChordQuality, isChordQuality } from './quality';
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

  return quality === 'm'
    ? [root, lowerPitch(third), fifth]
    : quality === 'dim'
    ? [root, lowerPitch(third), lowerPitch(fifth)]
    : quality === 'aug'
    ? [root, third, heightenPitch(fifth)]
    : quality === '6'
    ? [root, third, fifth, sixth]
    : quality === 'maj7'
    ? [root, third, fifth, seventh]
    : quality === '7'
    ? [root, third, fifth, lowerPitch(seventh)]
    : quality === '7sus'
    ? [root, fourth, fifth, lowerPitch(seventh)]
    : quality === 'm7'
    ? [root, lowerPitch(third), fifth, lowerPitch(seventh)]
    : quality === 'dim7'
    ? [
        root,
        lowerPitch(third),
        lowerPitch(fifth),
        lowerPitch(lowerPitch(seventh)),
      ]
    : quality === 'aug7'
    ? [root, third, heightenPitch(fifth), lowerPitch(seventh)]
    : quality === '⦰7'
    ? [root, lowerPitch(third), lowerPitch(fifth), lowerPitch(seventh)]
    : quality === 'sus2'
    ? [root, second, fifth]
    : quality === 'sus4'
    ? [root, fourth, fifth]
    : [root, third, fifth];
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
