const root_path = '..'

const Run = require(root_path + '/2-core-logic/run')

module.exports = (Db) => {
  let db

  const addRun = (start_date, end_date, kilo, calo) => {
    return Db.insertOneRun(start_date, end_date, kilo, calo, db)
  }

  const average = (array) => {
    if (array.length === 0) {
      return 0
    }

    return array.reduce((acc, val) => acc + val, 0) / array.length
  }

  const statsBetween = (start_date, end_date) => {
    return Db.selectAllRunBetween(start_date, end_date, db).then((runs) => {
      runs = runs.map((a) => Run.crop(start_date, end_date, a))
      const kilos = []
      const calos = []

      runs.forEach(run => {
        kilos.push(Run.getNumKilometers(run))
        calos.push(Run.getCalories(run))
      })

      return {
        average_kilo:average(kilos),
        average_calo:average(calos),
      }
    })
  }

  return Db.create().then((_db) => {
    db = _db
    
    return {
      addRun,
      statsBetween,
    }
  })

}
