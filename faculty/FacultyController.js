var express = require("express");
var router = express.Router();
const pool = require("../db");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// save a faculty to database
router.get("/", function(req, res) {
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ code: 100, status: 'Error in connection database' });
    }
    connection.query('select * from faculty;', (err, rows) => {
      connection.release();
      if (err) {
        res.json({ code: 100, status: 'Query failed in DB' });
      } else {
        res.json({
          faculties: [
            {
              
              self: `http://localhost:8090/api/faculties/${res.faculty_id}`,
              id: `${res.faculty_id}`,
              name: `${res.name}`
            }
          ]
        });
      }
    });
  });
});

router.post("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ code: 100, status: "Error in connection database" });
    }

    let name = req.body.name;

    connection.query(
        `SELECT * FROM faculty WHERE name='${name}'`,

        (err, result) => {
          if (err) {
            res.status(100).json({ message: "Error in mysql query" });
          } else {
            if (result.length > 0 && result !== null) {

              connection.release();
              res.status(409).json({
                status: 409,
                message: `A faculty with name: ${name} already exists.`,
                developerMessage: `Faculty creation failed because the faculty name: ${
                  name
                } already exists.`
              });
            } else {
        connection.query(
            `INSERT INTO faculty (name) VALUES ('${name}')`,
        err => {
          connection.release();
          if (err) {
            res.json({ status: 100, message: "Query failed in DB" });
          } else {
            res.status(201).json({
              self: `http://localhost:8090/api/faculties/${result.faculty_id}`,
              name: name
            });
          }
        }
      );
            }
          }
        }
      );

  });
});

module.exports = router;
