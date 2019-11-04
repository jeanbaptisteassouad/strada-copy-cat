const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const expect = chai.expect

const root_path = '.'
const MainMiddleware = require(root_path + '/main-middleware')

const port = 8000

const url = 'http://localhost:' + port

describe('MainMiddleware : test of the api endpoints', () => {
  describe('Post /addRun', () => {
    const addRunTest = (start_date, end_date, kilo, calo, status, ans, done) => {
      const Api = {
        addRun: (_start_date, _end_date, _kilo, _calo) => {
          expect(_start_date).to.equal(start_date)
          expect(_end_date).to.equal(end_date)
          expect(_kilo).to.equal(kilo)
          expect(_calo).to.equal(calo)

          return ans.id
        }
      }

      const app = MainMiddleware(Api)
      chai.request(app)
        .post('/addRun')
        .query({ start_date, end_date, kilo, calo })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(status)
          expect(res.body).to.deep.equal(ans)

          done()
        })
    }

    it('should call Api.addRun and return the created run id', (done) => {
      addRunTest(100, 300, 10, 350, 200, {id:'my_id'}, done)
    })

    it('should failed if one of the parameters is not good', (done) => {
      addRunTest(-100, 300, 10, 350, 400, {}, done)
    })

    it('should failed if end_date < start_date', (done) => {
      addRunTest(600, 300, 10, 350, 400, {}, done)
    })
  })

  describe('Get /statsBetween', () => {
    const statsBetweenTest = (start_date, end_date, status, ans, done) => {
      const Api = {
        statsBetween: (start_date, end_date) => {
          return {
            average_kilo:ans.average_kilo,
            average_calo:ans.average_calo,
          }
        }
      }

      const app = MainMiddleware(Api)
      chai.request(app)
        .get('/statsBetween')
        .query({ start_date, end_date })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(status)
          expect(res.body).to.deep.equal(ans)

          done()
        })
    }

    it('should call Api.statsBetween and return average kilo and average calo', (done) => {
      statsBetweenTest(100, 300, 200, {average_kilo:12, average_calo: 87}, done)
    })

    it('should failed if end_date < start_date', (done) => {
      statsBetweenTest(500, 300, 400, {}, done)
    })

  })
})