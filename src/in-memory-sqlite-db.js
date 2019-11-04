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
}

const sqlite3 = require('sqlite3').verbose()
let db 

const create = () => {
  db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message)
    }
    console.log('Connected to the in-memory SQlite database.')
  })
}

// open database in memory
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});
 
// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});


module.exports = {
  create,
  insertOneRun,
  selectAllRunBetween,
}