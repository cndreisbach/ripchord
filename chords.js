export const majorProgressions = {
  'I': ['ii', 'iii', 'IV', 'V', 'vi', 'vii'],
  'ii': ['V', 'vii'],
  'iii': ['vi'],
  'IV': ['V', 'vii'],
  'V': ['I'],
  'vi': ['ii', 'IV'],
  'vii': ['I']
}

export const minorProgressions = {
  'i': ['ii', 'III', 'iv', 'V', 'VI', 'vii'],
  'ii': ['V', 'vii'],
  'III': ['VI'],
  'iv': ['V', 'vii'],
  'V': ['i'],
  'VI': ['ii', 'iv'],
  'vii': ['i']
}

function randomChoice (array) {
  return array[Math.floor(Math.random() * array.length)]
}

export function toTonalRoman (romanNumeral) {
  if (romanNumeral.toLowerCase() === romanNumeral) {
    return romanNumeral.toUpperCase() + 'm'
  }
  return romanNumeral
}

export class ChordProgressionGenerator {
  constructor (progressions) {
    this.progressions = progressions
    this.current = null
    this.history = []
  }

  nextChord () {
    if (!this.current) {
      if (Math.random() < 0.6) {
        this.current = Object.keys(this.progressions)[0]
      } else {
        this.current = randomChoice(Object.keys(this.progressions))
      }
    } else {
      this.current = randomChoice(this.progressions[this.current])
    }

    this.history.push(this.current)

    return this.current
  }
}
