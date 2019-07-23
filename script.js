
const chords = require('./chords.js')
const tonalProgression = require('@tonaljs/progression')
const chord = require('@tonaljs/chord')
const Vue = require('vue')

function convertProgressionToKey (progression, key) {
  return tonalProgression.fromRomanNumerals(key, progression)
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
      const cg = new chords.ChordProgressionGenerator(chords.majorProgressions)
      const numChordsInSeq = Math.floor(Math.random() * 4) + 3
      for (let i = 0; i < numChordsInSeq; i++) {
        cg.nextChord()
      }

      this.progressions.push(cg.history.map(chords.toTonalRoman))
    },

    playProgression: function (progression) {
      const chords = progression.split('-').map(p => chord.chord(p))
      console.log(chords)
    }
  }
})
