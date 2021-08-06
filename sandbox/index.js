import { scaleNames, getScale } from "./semitone.module.js";

const root = document.getElementById("root");

scaleNames.forEach((scaleName) => {
  const scale = getScale(scaleName);
  const scaleContainer = document.createElement("div");
  root.appendChild(scaleContainer);
  const scaleHeading = document.createElement("h2");
  scaleHeading.textContent = scale.alias
    ? `${scale.name} (${scale.alias})`
    : scale.name;
  scaleContainer.appendChild(scaleHeading);
  const list = document.createElement("ul");
  scaleContainer.appendChild(list);
  scale.progressions.forEach((progression) => {
    const li = document.createElement("li");
    li.textContent = progression.join(" – ");
    list.appendChild(li);
  });
});
