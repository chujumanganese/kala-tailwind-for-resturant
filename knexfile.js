/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const db = {
  client: 'sqlite3',
  connection: {
    filename: './sales.sqlite3'
  },
  useNullAsDefault: true,
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds'
  }
};

export default db;