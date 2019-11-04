const chai = require('chai')
const expect = chai.expect

const root_path = '.'

const Db = require(root_path + '/mockup-db')
const Api = require(root_path + '/api')(Db)

describe('Api : test of the api logic', () => {
  describe('.addRun', () => {
    it('1 addRun call should return run id 0', () => {
      const id = Api.addRun(50, 190, 1, 10)

      expect(id).to.deep.equal(0)
    })

    it('2 addRun call should return run id 1', () => {
      const id = Api.addRun(200, 250, 1, 10)

      expect(id).to.deep.equal(1)
    })

    it('3 addRun call should return run id 2', () => {
      const id = Api.addRun(225, 325, 1, 10)

      expect(id).to.deep.equal(2)
    })

    it('4 addRun call should return run id 3', () => {
      const id = Api.addRun(300, 400, 1, 10)

      expect(id).to.deep.equal(3)
    })
  })

  describe('.statsBetween', () => {
    it('statsBetween(50,400) should return {average_kilo:1, average_calo:10}', () => {
      const {average_kilo, average_calo} = Api.statsBetween(50, 400)

      expect(average_kilo).to.deep.equal(1)
      expect(average_calo).to.deep.equal(10)
    })

    it('statsBetween(50,275) should return {average_kilo:2.5 / 3, average_calo:25 / 3}', () => {
      const {average_kilo, average_calo} = Api.statsBetween(50, 275)

      expect(average_kilo).to.deep.equal(2.5 / 3)
      expect(average_calo).to.deep.equal(25 / 3)
    })

    it('statsBetween(120,225) should return {average_kilo:1 / 3, average_calo:10 / 3}', () => {
      const {average_kilo, average_calo} = Api.statsBetween(120, 225)

      expect(average_kilo).to.deep.equal(1 / 3)
      expect(average_calo).to.deep.equal(10 / 3)
    })
  })  
})