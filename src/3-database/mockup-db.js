const root_path = '..'

const Run = require(root_path + '/2-core-logic/run')

const create = () => {
  return new Promise((resolve, reject) => {
    resolve([])
  })
}

const insertOneRun = (start_date, end_date, km, calo, a) => {
  return new Promise((resolve, reject) => {
    const run = Run.create(
      start_date,
      end_date,
      km,
      calo
    )

    a.push(run)

    const run_id = a.length - 1

    resolve(run_id)    
  })
}

const selectAllRunBetween = (start_date, end_date, a) => {
  return new Promise((resolve, reject) => {
    const ans = a.filter((a) => start_date <= Run.getEndDate(a) && Run.getStartDate(a) <= end_date)
    resolve(ans)
  })
}


module.exports = {
  create,
  insertOneRun,
  selectAllRunBetween,
}