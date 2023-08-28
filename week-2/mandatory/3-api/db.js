const { Pool } = require("pg");

const db = new Pool({
  user: "maxbmaapc",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

module.exports = db;
