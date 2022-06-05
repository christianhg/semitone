import {
  scaleNames,
  getScale,
  symbols,
  getChord,
  getNoteProgressions,
} from 'semitone';

const root = document.getElementById('root');

const chordsContainer = document.createElement('div');
const chordsHeading = document.createElement('h2');
chordsHeading.textContent = 'Chords';
const list = document.createElement('ul');

symbols.naturalNotes
  .map(note => [`${note}${symbols.flat}`, `${note}`, `${note}${symbols.sharp}`])
  .flat()
  .map(note => [
    `${note}`,
    `${note}${symbols.minor}`,
    `${note}${symbols.diminished}`,
    `${note}${symbols.augmented}`,
    `${note}${symbols.sixth}`,
    `${note}${symbols.major}${symbols.seventh}`,
    `${note}${symbols.seventh}`,
    `${note}${symbols.seventh}${symbols.suspended}`,
    `${note}${symbols.minor}${symbols.seventh}`,
    `${note}${symbols.diminished}${symbols.seventh}`,
    `${note}${symbols.augmented}${symbols.seventh}`,
    `${note}${symbols.halfDiminished}${symbols.seventh}`,
    `${note}${symbols.suspended}${symbols.second}`,
    `${note}${symbols.suspended}${symbols.fourth}`,
  ])
  .flat()
  .map(note => {
    const li = document.createElement('li');
    li.textContent = `${note}: ${getChord(note).join(' – ')}`;
    list.appendChild(li);
  });

chordsContainer.appendChild(chordsHeading);
chordsContainer.appendChild(list);
root.appendChild(chordsContainer);

scaleNames.forEach(scaleName => {
  const scale = getScale(scaleName);

  const scaleContainer = document.createElement('div');
  const scaleHeading = document.createElement('h2');
  const list = document.createElement('ul');

  scaleHeading.textContent = scale.alias
    ? `${scale.name} (${scale.alias})`
    : scale.name;

  symbols.naturalNotes
    .map(note => [
      getNoteProgressions(`${note}${symbols.flat}`, scale.interval),
      getNoteProgressions(`${note}`, scale.interval),
      getNoteProgressions(`${note}${symbols.sharp}`, scale.interval),
    ])
    .flat()
    .forEach(progression => {
      const li = document.createElement('li');
      li.textContent = progression.join(' – ');
      list.appendChild(li);
    });

  scaleContainer.appendChild(scaleHeading);
  scaleContainer.appendChild(list);
  root.appendChild(scaleContainer);
});
