/* globals describe, it, chai */
import { majorProgressions, ChordGenerator } from '../chords.js'
let assert = chai.assert

describe('Major progressions', function () {
  it('should have all chords progressing from I', function () {
    assert.deepEqual(majorProgressions['I'], ['ii', 'iii', 'IV', 'V', 'vi', 'vii'])
  })
})

describe('ChordGenerator', function () {
  describe('in a major key', function () {
    it('should start on any key', function () {
      let cg = new ChordGenerator(majorProgressions)
      let nextChord = cg.nextChord()
      assert.include(Object.keys(majorProgressions), nextChord)
    })

    it('should only allow correct transitions', function () {
      let cg = new ChordGenerator(majorProgressions)
      cg.current = 'V'
      assert.equal(cg.nextChord(), 'I')
      assert.include(majorProgressions['I'], cg.nextChord())
    })

    it('should keep a history of transitions', function () {
      let cg = new ChordGenerator(majorProgressions)
      let c1 = cg.nextChord()
      let c2 = cg.nextChord()
      let c3 = cg.nextChord()
      assert.equal(cg.history.length, 3)
      assert.deepEqual(cg.history, [c1, c2, c3])
    })
  })
})
