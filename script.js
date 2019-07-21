/* If you're feeling fancy you can add interactivity
    to your site with Javascript */

import { majorProgressions, ChordProgressionGenerator, toTonalRoman } from './chords.js'
import { fromRomanNumerals } from './web_modules/@tonaljs/progression.js'

const q = sel => document.querySelector(sel)

document.querySelector('#make-chords').addEventListener('click', function () {
  const cg = new ChordProgressionGenerator(majorProgressions)
  const numChordsInSeq = Math.floor(Math.random() * 4) + 3
  const key = q('#pick-key').value

  for (let i = 0; i < numChordsInSeq; i++) {
    cg.nextChord()
  }

  let output = document.createElement('p')
  let chords = fromRomanNumerals(key, cg.history.map(toTonalRoman))
  output.innerText = chords.join('-')

  document.querySelector('#chords').appendChild(output)
})
