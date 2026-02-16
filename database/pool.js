const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: "postgres",
  database: "expenses_db",
  password: "Campbell1!",
  port: 5432 // The default port
});
