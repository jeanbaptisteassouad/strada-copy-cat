const root_path = '..'

const Run = require(root_path + '/2-core-logic/run')

const sqlite3 = require('sqlite3').verbose()

const create = () => {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        reject(err)
        return console.error(err.message)
      }
      console.log('Connected to the in-memory SQlite database.')

      let sql_cmd = ''
      sql_cmd += 'CREATE TABLE runs('
      sql_cmd += 'start_date INTEGER NOT NULL,'
      sql_cmd += 'end_date INTEGER NOT NULL,'
      sql_cmd += 'kilo INTEGER NOT NULL,'
      sql_cmd += 'calo INTEGER NOT NULL'
      sql_cmd += ')'
      db.run(sql_cmd, () => resolve(db))
    })
  })
}

const insertOneRun = (start_date, end_date, km, calo, a) => {
  return new Promise((resolve, reject) => {
    let sql_cmd = ''
    sql_cmd += 'INSERT INTO runs VALUES ('
    sql_cmd += start_date + ','
    sql_cmd += end_date + ','
    sql_cmd += km + ','
    sql_cmd += calo
    sql_cmd += ')'

    a.run(sql_cmd, [], function(err) {
      if (err) {
        reject(err)
        return console.error(err.message)
      }
      // console.log(`A row has been inserted with rowid ${this.lastID}`)
      resolve(this.lastID - 1)
    })
  })
}

const selectAllRunBetween = (start_date, end_date, a) => {
  return new Promise((resolve, reject) => {
    let sql_cmd = ''
    sql_cmd += 'SELECT * FROM runs WHERE '
    sql_cmd += start_date + ' <= end_date'
    sql_cmd += ' AND start_date <= ' + end_date
    a.all(sql_cmd, [], (err, rows) => {
      if (err) {
        reject(err)
        return console.error(err.message)
      }
      resolve(rows.map((a) => Run.create(a.start_date, a.end_date, a.kilo, a.calo)))
    })
  })
}


module.exports = {
  create,
  insertOneRun,
  selectAllRunBetween,
}