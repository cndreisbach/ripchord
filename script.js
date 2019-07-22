
import { majorProgressions, ChordProgressionGenerator, toTonalRoman } from './chords.js'
import { fromRomanNumerals } from './web_modules/@tonaljs/progression.js'
import { chord } from './web_modules/@tonaljs/chord.js'
import Vue from './node_modules/vue/dist/vue.esm.browser.js'

function convertProgressionToKey (progression, key) {
  return fromRomanNumerals(key, progression)
}

const ChordWidget = new Vue({
  el: '#chord-widget',
  data: {
    key: '-',
    keys: ['-', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
    progressions: []
  },
  computed: {
    progressionsInKey: function () {
      if (this.key === '-') {
        return this.progressions.map(p => p.join('-'))
      } else {
        return this.progressions.map(p => convertProgressionToKey(p, this.key).join('-'))
      }
    }
  },
  methods: {
    generateProgression: function () {
      const cg = new ChordProgressionGenerator(majorProgressions)
      const numChordsInSeq = Math.floor(Math.random() * 4) + 3
      for (let i = 0; i < numChordsInSeq; i++) {
        cg.nextChord()
      }
      // const chords = fromRomanNumerals(this.key, cg.history.map(toTonalRoman))
      this.progressions.push(cg.history.map(toTonalRoman))
    },

    playProgression: function (progression) {
      const chords = progression.split('-').map(p => chord(p))
      console.log(chords)
    }
  }
})
