import { getNoteProgressions } from './progression';
import { scaleIntervals, ScaleNotes } from './scale';
import { getChord, ChordAbbreviation, Chord } from './semitone';

test(getChord.name, () => {
  const chords = new Map<ChordAbbreviation, Chord>([
    ['C', ['C', 'E', 'G']],
    ['C7', ['C', 'E', 'G', 'B♭']],
    ['Cm7', ['C', 'E♭', 'G', 'B♭']],
    ['Cmaj7', ['C', 'E', 'G', 'B']],
    ['Cdim7', ['C', 'E♭', 'G♭', 'B𝄫']],
    ['C⦰7', ['C', 'E♭', 'G♭', 'B♭']],
    ['Am', ['A', 'C', 'E']],
    ['Caug', ['C', 'E', 'G♯']],
    ['F♭dim', ['F♭', 'A𝄫', 'C𝄫']],
    ['Fmaj7', ['F', 'A', 'C', 'E']],
    ['F7', ['F', 'A', 'C', 'E♭']],
    ['Fm7', ['F', 'A♭', 'C', 'E♭']],
    ['Fdim7', ['F', 'A♭', 'C♭', 'E𝄫']],
    ['F⦰7', ['F', 'A♭', 'C♭', 'E♭']],
    ['Csus2', ['C', 'D', 'G']],
    ['Csus4', ['C', 'F', 'G']],
    ['F7sus', ['F', 'B♭', 'C', 'E♭']],
    ['Faug7', ['F', 'A', 'C♯', 'E♭']],
    ['F6', ['F', 'A', 'C', 'D']],
  ]);

  [...chords.entries()].forEach(([abbreviation, chord]) => {
    expect(getChord(abbreviation)).toEqual(chord);
  });
});

test(getNoteProgressions.name, () => {
  const majorScales: ScaleNotes[] = [
    ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
    ['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯', 'D'],
    ['E', 'F♯', 'G♯', 'A', 'B', 'C♯', 'D♯', 'E'],
    ['F', 'G', 'A', 'B♭', 'C', 'D', 'E', 'F'],
    ['G', 'A', 'B', 'C', 'D', 'E', 'F♯', 'G'],
    ['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯', 'A'],
    ['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯', 'B'],
  ];

  majorScales.forEach(majorScale => {
    expect(
      getNoteProgressions(majorScale[0], scaleIntervals['ionian']),
    ).toEqual(majorScale);
  });
});
