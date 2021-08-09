import { Accidental } from "./accidental";
import { NaturalNote } from "./symbols";

export type Note = `${NaturalNote}${Accidental}`;

export function splitNote(note: Note): [NaturalNote, Accidental] {
  const [naturalNote, accidental = ""] = note.split("") as [
    NaturalNote,
    Accidental
  ];
  return [naturalNote, accidental];
}

export function lowerPitch(note: Note): Note {
  const [root, accidental] = splitNote(note);

  return `${root}${
    accidental === "𝄪"
      ? "♯"
      : accidental === "♯"
      ? ""
      : accidental === ""
      ? "♭"
      : accidental === "♭"
      ? "𝄫"
      : ""
  }`;
}

export function heightenPitch(note: Note): Note {
  const [root, accidental] = splitNote(note);

  return `${root}${
    accidental === "𝄫"
      ? "♭"
      : accidental === "♭"
      ? ""
      : accidental === ""
      ? "♯"
      : accidental === "♯"
      ? "𝄪"
      : ""
  }`;
}
