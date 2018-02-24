const pool = require("../db");

module.exports = function(req, res) {
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ code: 100, status: "Error in connection database" });
    }
    console.log(req);
    connection.query(`SELECT * FROM user`, err => {
      connection.release();
      if (err) {
        res.json({ code: 100, status: "Query failed in DB" });
      } else {
        res.json({ code: 200, status: "Success" });
      }
    });
  });
};
