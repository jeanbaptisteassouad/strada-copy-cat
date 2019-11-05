
const createAccessors = (name) => {
  const get = (a) => a[name]
  const set = (val, a) => a[name] = val
  const update = (f, a) => set(f(get(a)), a)
  return [get, set, update]
}

const [getStartDate, setStartDate] = createAccessors('start_date')
const [getEndDate, setEndDate] = createAccessors('end_date')
const [getNumKilometers, setNumKilometers] = createAccessors('num_kilo')
const [getCalories, setCalories] = createAccessors('burnt_calories')

const empty = () => {
  const a = {}

  const default_epoch_date = 0

  setStartDate(default_epoch_date, a)
  setEndDate(default_epoch_date, a)
  setNumKilometers(0, a)
  setCalories(0, a)

  return a
}

const create = (start_date, end_date, kilo, calo) => {
  const a = empty()

  setStartDate(start_date, a)
  setEndDate(end_date, a)
  setNumKilometers(kilo, a)
  setCalories(calo, a)

  return a
}

// crop function is using a linear interpolation for the
// number of kilometers and of calories when 'start_date' and 'end_date'
// don't fully enclose the run 'a'
const crop = (start_date, end_date, a) => {
  const run_start_date = getStartDate(a)
  const run_end_date = getEndDate(a)

  if (run_end_date <= start_date) {
    return empty()
  } else if (end_date <= run_start_date) {
    return empty()
  } else {
    const cropped_start_date = Math.max(run_start_date, start_date)
    const cropped_end_date = Math.min(run_end_date, end_date)

    const ratio = (cropped_end_date - cropped_start_date) / (run_end_date - run_start_date)

    const cropped_kilo = getNumKilometers(a) * ratio
    const cropped_calorie = getCalories(a) * ratio

    return create(
      cropped_start_date,
      cropped_end_date,
      cropped_kilo,
      cropped_calorie
    )
  }
}


module.exports = {
  empty,
  create,

  getEndDate,
  getStartDate,
  getNumKilometers,
  getCalories,

  crop,
}
