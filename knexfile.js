// Update with your config settings.
require("dotenv").config()

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: process.env.DATABASE,
      user: process.env.USER,
      password: process.env.PASSWORD
    },
    debug: true,
    pool: {
      min: 2,
      max: 10,
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tablename: 'knex_migrations',
      directory: './migrations'
    }
  }
};
