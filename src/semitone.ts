import { Accidental, isAccidental } from "./accidental";
import { heightenPitch, lowerPitch, Note } from "./note";
import { getNoteProgressions } from "./progression";
import {getScale, scaleIntervals, scaleNames } from "./scale";
import {
  Augmented,
  Diminished,
  isNaturalNote,
  Minor,
  NaturalNote,
  symbols,
} from "./symbols";

export { getNoteProgressions, getScale, scaleNames, symbols }

export type Chord = [Note, Note, Note];
export type ChordAbbreviation = `${NaturalNote}${ChordQuality}`;
type ChordQuality = "" | Minor | Augmented | Diminished;
type SeventhChordQuality = "maj7" | "7" | "m7" | "dim7" | "⦰7";

export function getChord(
  chordAbbreviation: ChordAbbreviation
): Chord | undefined {
  const parsedChord = parseChordAbbreviation(chordAbbreviation);

  if (!parsedChord) {
    return undefined;
  }

  const { note, accidental, quality } = parsedChord;

  const [root, , third, , fifth] = getNoteProgressions(
    `${note}${accidental}`,
    scaleIntervals.ionian
  );

  return quality === "m"
    ? [root, lowerPitch(third), fifth]
    : quality === "dim"
    ? [root, lowerPitch(third), lowerPitch(fifth)]
    : quality === "aug"
    ? [root, third, heightenPitch(fifth)]
    : [root, third, fifth];
}

type ParsedChordAbbreviation = {
  note: NaturalNote;
  accidental: Accidental;
  quality: ChordQuality;
};

function parseChordAbbreviation(
  chordAbbreviation: ChordAbbreviation
): ParsedChordAbbreviation | undefined {
  const list = chordAbbreviation.split("");
  const note = isNaturalNote(list[0]) ? list[0] : undefined;

  if (!note) {
    return;
  }

  list.shift();

  const accidental = isAccidental(list[0]) ? list[0] : "";

  if (accidental) {
    list.shift();
  }

  const possibleQuality = list.join("");

  const quality = isChordQuality(possibleQuality) ? possibleQuality : "";

  return {
    note,
    accidental,
    quality,
  };
}

function isChordQuality(string: string): string is ChordQuality {
  return (
    string === symbols.minor ||
    string === symbols.diminished ||
    string === symbols.augmented
  );
}
