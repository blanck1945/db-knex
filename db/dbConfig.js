const dbEngine = process.env.DB_ENVIRONIMENT || "development"
const config = require("../knexfile")[dbEngine]

module.exports = require("knex")(config)