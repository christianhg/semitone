import { getScale, symbols } from "./semitone.module.js";

const majorScales = symbols.naturalNotes
  .map((naturalNote) => [
    getScale(`${naturalNote}${symbols.flat}`, "major"),
    getScale(naturalNote, "major"),
    getScale(`${naturalNote}${symbols.sharp}`, "major"),
  ])
  .flat()
  .map((scale) => scale.join(" – "));

const majorScalesList = document.getElementById("majorScales");

majorScales.forEach((scale) => {
  const li = document.createElement("li");
  li.textContent = scale;
  majorScalesList.appendChild(li);
});
