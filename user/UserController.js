var express = require("express");
var router = express.Router();
const pool = require("../db");

var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// test a user simply from database
router.get("/test", function(req, res) {
  res.json({ code: 200, status: "Test" });
});

// save a user to database
router.post("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ code: 100, status: "Error in connection database" });
    }
    console.log(req.body.email);
    connection.query(
      `INSERT INTO user(email,password) VALUES('${req.body.email}','1234')`,
      err => {
        connection.release();
        if (err) {
          res.json({ code: 100, status: "Query failed in DB" });
        } else {
          res.json({ code: 200, status: "Success" });
        }
      }
    );
  });
});

module.exports = router;
