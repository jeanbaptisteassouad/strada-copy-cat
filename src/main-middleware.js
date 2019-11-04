const express = require('express')

module.exports = (Api) => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  const validateNumberQuery = (prop) => (req, res, next) => {
    const query = req.query
    if (query[prop]) {
      query[prop] = Number(query[prop])
      if (isNaN(query[prop]) === false) {
        if (0 <= query[prop]) {
          next()
          return
        }
      }
    }

    res.sendStatus(400)
  }

  const startDateMustBeLowerThatEndDate = (req, res, next) => {
    const query = req.query
    if (query.start_date <= query.end_date) {
      next()
      return
    }

    res.sendStatus(400)
  }

  app.post('/addRun',
    validateNumberQuery('start_date'),
    validateNumberQuery('end_date'),
    validateNumberQuery('kilo'),
    validateNumberQuery('calo'),
    startDateMustBeLowerThatEndDate,
    (req, res) => {
      const start_date = req.query.start_date
      const end_date = req.query.end_date
      const kilo = req.query.kilo
      const calo = req.query.calo


      const id = Api.addRun(start_date, end_date, kilo, calo)

      res.send({
        id
      })
    }
  )

  app.get('/statsBetween',
    validateNumberQuery('start_date'),
    validateNumberQuery('end_date'),
    startDateMustBeLowerThatEndDate,
    (req, res) => {
      const start_date = req.query.start_date
      const end_date = req.query.end_date

      const ans = Api.statsBetween(start_date, end_date)

      res.send({
        average_kilo:ans.average_kilo,
        average_calo:ans.average_calo,
      })
    }
  )

  return app
}