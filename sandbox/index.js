import {
  scaleNames,
  getScale,
  symbols,
  getNoteProgressions,
} from "./semitone.module.js";

const root = document.getElementById("root");

scaleNames.forEach((scaleName) => {
  const scale = getScale(scaleName);

  const scaleContainer = document.createElement("div");
  const scaleHeading = document.createElement("h2");
  const list = document.createElement("ul");

  scaleHeading.textContent = scale.alias
    ? `${scale.name} (${scale.alias})`
    : scale.name;

  symbols.naturalNotes
    .map((note) => [
      getNoteProgressions(`${note}${symbols.flat}`, scale.interval),
      getNoteProgressions(`${note}`, scale.interval),
      getNoteProgressions(`${note}${symbols.sharp}`, scale.interval),
    ])
    .flat()
    .forEach((progression) => {
      const li = document.createElement("li");
      li.textContent = progression.join(" – ");
      list.appendChild(li);
    });

  scaleContainer.appendChild(scaleHeading);
  scaleContainer.appendChild(list);
  root.appendChild(scaleContainer);
});
