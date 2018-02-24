var express = require("express");
var router = express.Router();
const pool = require("../db");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



router.get("/", function(req, res) {
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ code: 100, status: 'Error in connection database' });
    }
    connection.query('SELECT * FROM degree;', (err, rows) => {
      connection.release();
      if (err) {
        res.json({ code: 100, status: 'Query failed in DB' });
      } else {
        res.status(200).json({
          degrees: [
            {

              self: `http://localhost:8090/api/departments/${res.degree_id}`,
              id: `${res.degree_id}`,
              name: `${res.name}`
            }
          ]
        });
      }
    });
  });
});

router.get("/:department_id", function(req, res) {
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ code: 100, status: 'Error in connection database' });
    }
    connection.query(`SELECT * FROM degree WHERE department_id = ${res.params.department_id};`, (err, rows) => {
      connection.release();
      if (err) {
        res.json({ code: 100, status: 'Query failed in DB' });
      } else {
        res.json({
          departments: [
            {

              self: `http://localhost:8090/api/degrees/${res.degree_id}`,
              id: `${res.degree_id}`,
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
    let department_id = req.body.department_id;

    connection.query(
        `SELECT * FROM degree WHERE name='${name}'`,

        (err, result) => {
          if (err) {
            res.status(100).json({ message: "Error in mysql query" });
          } else {
            if (result.length > 0 && result !== null) {

              connection.release();
              res.status(409).json({
                status: 409
              });
            } else {
        connection.query(
            `INSERT INTO degree (name, department_id) VALUES ('${name}', ${department_id})`,
        err => {
          connection.release();
          if (err) {
            res.json({ status: 100, message: "Query failed in DB" });
          } else {
            res.status(201).json({
              self: `http://localhost:8090/api/degrees/${result.degree_id}`,
              name: name,
              faculty: {
                self: `http://localhost:8090/api/faculties/${result.department_id}`,
                name: `${result.name}`
              }
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
