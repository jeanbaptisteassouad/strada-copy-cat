const root_path = '..'

const SqliteDb = require(root_path + '/3-database/sqlite-db')

module.exports = SqliteDb('./db/sqlite.db')
