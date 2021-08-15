import { accidentalToOffset, offsetToAccidental } from './accidental';
import { Note, splitNote } from './note';
import {
  ScaleInterval,
  ScaleNotes,
  ScaleStep,
  scaleStepToOffset,
} from './scale';
import { NaturalNote } from './symbols';

export function getNoteProgressions(
  note: Note,
  interval: ScaleInterval,
): ScaleNotes {
  let scale: ScaleNotes = [note, note, note, note, note, note, note, note];

  let [currentNote, currentAccidental] = splitNote(note);
  let [nextNote, nextNoteOffset] = noteProgression[currentNote];

  for (let index = 0; index < interval.length; index++) {
    const step = interval[index];

    const offset =
      accidentalToOffset[currentAccidental] +
      scaleStepToOffset[step] -
      scaleStepToOffset[nextNoteOffset];

    const accidental = offsetToAccidental.get(offset)!;

    scale[index + 1] = `${nextNote}${accidental}`;

    currentNote = nextNote;
    currentAccidental = accidental;
    [nextNote, nextNoteOffset] = noteProgression[currentNote];
  }

  return scale;
}

const noteProgression: Record<NaturalNote, [NaturalNote, ScaleStep]> = {
  C: ['D', 'W'],
  D: ['E', 'W'],
  E: ['F', 'H'],
  F: ['G', 'W'],
  G: ['A', 'W'],
  A: ['B', 'W'],
  B: ['C', 'H'],
};
