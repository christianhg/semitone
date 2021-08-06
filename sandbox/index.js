import { getScale, symbols } from "./semitone.module.js";

function generateScales(scaleName) {
  const majorScales = symbols.naturalNotes
    .map((naturalNote) => [
      getScale(`${naturalNote}${symbols.flat}`, scaleName),
      getScale(naturalNote, scaleName),
      getScale(`${naturalNote}${symbols.sharp}`, scaleName),
    ])
    .flat()
    .map((scale) => scale.join(" – "));

  const majorScalesList = document.getElementById(`${scaleName}Scales`);

  majorScales.forEach((scale) => {
    const li = document.createElement("li");
    li.textContent = scale;
    majorScalesList.appendChild(li);
  });
}

generateScales("major");
generateScales("natural-minor");
