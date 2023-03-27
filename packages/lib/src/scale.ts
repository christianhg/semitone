import { Note } from './note';

export type Scale = {
  name: ScaleName;
  alias?: ScaleAlias;
  interval: ScaleInterval;
};

export function getScale(scaleName: ScaleName | ScaleAlias): Scale {
  const name = isScaleAlias(scaleName)
    ? scaleAliasToName[scaleName]
    : scaleName;
  const interval = scaleIntervals[name];

  return {
    name,
    alias: scaleNameToAlias[name],
    interval,
  };
}

export type ScaleStep = 'W' | 'H';
export type ScaleInterval = [
  ScaleStep,
  ScaleStep,
  ScaleStep,
  ScaleStep,
  ScaleStep,
  ScaleStep,
  ScaleStep,
];
export type ScaleNotes = [Note, Note, Note, Note, Note, Note, Note, Note];

function isScaleAlias(
  scaleName: ScaleAlias | ScaleName,
): scaleName is ScaleAlias {
  return scaleAliases.includes(scaleName as any);
}

export const scaleNames = [
  'ionian',
  'dorian',
  'phrygian',
  'lydian',
  'mixolydian',
  'aeolian',
  'locrian',
] as const;
export const scaleAliases = ['major', 'natural-minor'] as const;

type ScaleName = (typeof scaleNames)[number];
type ScaleAlias = (typeof scaleAliases)[number];

const scaleAliasToName: Record<ScaleAlias, ScaleName> = {
  major: 'ionian',
  'natural-minor': 'aeolian',
} as const;

const scaleNameToAlias: Record<ScaleName, ScaleAlias | undefined> = {
  ionian: 'major',
  dorian: undefined,
  phrygian: undefined,
  lydian: undefined,
  mixolydian: undefined,
  aeolian: 'natural-minor',
  locrian: undefined,
} as const;

export const scaleIntervals: Record<ScaleName, ScaleInterval> = {
  ionian: ['W', 'W', 'H', 'W', 'W', 'W', 'H'],
  dorian: ['W', 'H', 'W', 'W', 'W', 'H', 'W'],
  phrygian: ['H', 'W', 'W', 'W', 'H', 'W', 'W'],
  lydian: ['W', 'W', 'W', 'H', 'W', 'H', 'W'],
  mixolydian: ['W', 'W', 'H', 'W', 'W', 'H', 'W'],
  aeolian: ['W', 'H', 'W', 'W', 'H', 'W', 'W'],
  locrian: ['H', 'W', 'W', 'H', 'W', 'W', 'W'],
};

export const scaleStepToOffset: Record<ScaleStep, 1 | 2> = {
  H: 1,
  W: 2,
} as const;
