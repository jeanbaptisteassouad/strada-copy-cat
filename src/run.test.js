const chai = require('chai')
const expect = chai.expect

const root_path = '.'

const Run = require(root_path + '/run')

describe('Run : test of the run data structure', () => {
  describe('.crop', () => {
    // { is the start_date of the interval
    // } is the end_date of the interval
    it('{}[ my run ] === empty', () => {
      const a = Run.create(100, 200, 1, 2)
      const b = Run.crop(50, 100, a)

      expect(b).to.deep.equal(Run.empty())
    })

    it('[ my run ]{} === empty', () => {
      const a = Run.create(100, 200, 1, 2)
      const b = Run.crop(200, 230, a)

      expect(b).to.deep.equal(Run.empty())
    })

    it('{ [ my run ] } === empty', () => {
      const a = Run.create(100, 200, 1, 2)
      const b = Run.crop(50, 230, a)

      expect(b).to.deep.equal(a)
    })

    it('[ m{y ru}n ] === empty', () => {
      const a = Run.create(100, 200, 1, 2)
      const b = Run.crop(125, 175, a)

      expect(b).to.deep.equal(Run.create(125, 175, 0.5, 1))
    })

  })
})