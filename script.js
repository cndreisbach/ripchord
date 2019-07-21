
import { majorProgressions, ChordProgressionGenerator, toTonalRoman } from './chords.js'
import { fromRomanNumerals } from './web_modules/@tonaljs/progression.js'

import Vue from './node_modules/vue/dist/vue.esm.browser.js'

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
        return this.progressions.map(p => p.join("-"))
      } else {
        return this.progressions.map(p => fromRomanNumerals(this.key, p).join("-"))
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
  }
})
