const root_path = '.'

const Run = require(root_path + '/run')

const create = () => {
  return []
}

const insertOneRun = (start_date, end_date, km, calo, a) => {
  const run = Run.create(
    start_date,
    end_date,
    km,
    calo
  )

  a.push(run)

  const run_id = a.length - 1

  return run_id
}

const selectAllRunBetween = (start_date, end_date, a) => {
  return a.filter((a) => start_date <= Run.getEndDate(a) && Run.getStartDate(a) <= end_date)
    .map((a) => Run.crop(start_date, end_date, a))
}


module.exports = {
  create,
  insertOneRun,
  selectAllRunBetween,
}