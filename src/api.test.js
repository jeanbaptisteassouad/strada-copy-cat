const chai = require('chai')
const expect = chai.expect

const root_path = '.'

const Db = require(root_path + '/in-memory-sqlite-db')
// const Db = require(root_path + '/mockup-db')
require(root_path + '/api')(Db).then((Api) => {
  
  describe('Api : test of the api logic', () => {
    describe('.addRun', () => {
      it('1 addRun call should return run id 0', (done) => {
        Api.addRun(50, 190, 1, 10).then((id) => {
          expect(id).to.deep.equal(0)
          done()
        }, done)
      })

      it('2 addRun call should return run id 1', (done) => {
        Api.addRun(200, 250, 1, 10).then((id) => {
          expect(id).to.deep.equal(1)
          done()
        }, done)
      })

      it('3 addRun call should return run id 2', (done) => {
        Api.addRun(225, 325, 1, 10).then((id) => {
          expect(id).to.deep.equal(2)
          done()
        }, done)
      })

      it('4 addRun call should return run id 3', (done) => {
        Api.addRun(300, 400, 1, 10).then((id) => {
          expect(id).to.deep.equal(3)
          done()
        }, done)
      })
    })

    describe('.statsBetween', () => {
      it('statsBetween(50,400) should return {average_kilo:1, average_calo:10}', (done) => {
        Api.statsBetween(50, 400).then(({average_kilo, average_calo}) => {
          expect(average_kilo).to.deep.equal(1)
          expect(average_calo).to.deep.equal(10)
          done()
        }, done)
      })

      it('statsBetween(50,275) should return {average_kilo:2.5 / 3, average_calo:25 / 3}', (done) => {
        Api.statsBetween(50, 275).then(({average_kilo, average_calo}) => {
          expect(average_kilo).to.deep.equal(2.5 / 3)
          expect(average_calo).to.deep.equal(25 / 3)
          done()
        }, done)
      })

      it('statsBetween(120,225) should return {average_kilo:1 / 3, average_calo:10 / 3}', (done) => {
        Api.statsBetween(120, 225).then(({average_kilo, average_calo}) => {
          expect(average_kilo).to.deep.equal(1 / 3)
          expect(average_calo).to.deep.equal(10 / 3)
          done()
        }, done)
      })
    })  
  })
})
