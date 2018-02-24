const mysql = require("mysql");

Object.defineProperty(exports, "__esModule", {
  value: true
});

const pool = mysql.createPool({
  connectionLimit: 50, // important
  host: "138.128.170.18",
  user: "sureadsl_user",
  password: "test123!",
  database: "sureadsl_deadLock"
});

module.exports = pool;
