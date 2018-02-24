var express = require("express");
var router = express.Router();
const pool = require("../db");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ code: 100, status: "Error in connection database" });
    }

    let name = req.body.name;
    let faculty_id = req.body.faculty_id;

    connection.query(
      `INSERT INTO department (name, faculty_id) VALUES ('${name}', ${faculty_id})`,
  err, result => {
    connection.release();
    if (err) {
      res.json({ status: 100, message: "Query failed in DB" });
    } else {
      res.status(201).json({
        self: `http://localhost:8090/api/departments/${result.department_id}`,
        name: name,

        faculty: {
          self: `http://localhost:8090/api/faculties/${result.faculty_id}`,
          name: `${result.name}`
        }
      });
    }
  }


      /*
        `SELECT * FROM faculty WHERE faculty_id='${faculty_id}'`,

        (err, result) => {
          if (err) {
            res.status(100).json({ message: "Error in mysql query" });
          } else {

            if (result.length == 0) {
              connection.release();
              res.status(400).json({
                status: 400});
            }else {
                connection.query(
                  `SELECT * FROM department WHERE name = '${name}'`,
                  (errDepartment, resultDepartment) => {

                    if (resultDepartment.length != 0) {
                      res.json({ status: 100, message: "Query failed in DB" });
                    } else {

                        if(resultDepartment.length != 0){
                            connection.release();
                              res.status(409).json({
                                      status: 409,
                                      message: `A department with name: ${name} already exist.`,
                                      developerMessage: `Department creation failed because the department name: ${
                                        name
                                      } already exist.`

                              });

            } else {

              connection.query(
                  `INSERT INTO department (name, faculty_id) VALUES ('${name}', ${faculty_id})`,
              err, insertRes => {
                connection.release();
                if (err) {
                  insertRes.json({ status: 100, message: "Query failed in DB" });
                } else {
                  insertRes.status(201).json({
                    self: `http://localhost:8090/api/departments/${resultDepartment.department_id}`,
                    name: name,

                    faculty: {
                      self: `http://localhost:8090/api/faculties/${result.faculty_id}`,
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

        }



         }
       }*/
     );


  });
});


router.get("/", function(req, res) {
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ code: 100, status: 'Error in connection database' });
    }
    connection.query('SELECT * FROM department;', (err, rows) => {
      connection.release();
      if (err) {
        res.json({ code: 100, status: 'Query failed in DB' });
      } else {
        res.json({
          departments: [
            {

              self: `http://localhost:8090/api/departments/${res.department_id}`,
              id: `${res.department_id}`,
              name: `${res.name}`
            }
          ]
        });
      }
    });
  });
});

router.get("/:faculty_id", function(req, res) {
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ code: 100, status: 'Error in connection database' });
    }
    connection.query(`SELECT * FROM department WHERE faculty_id = ${res.params.faculty_id};`, (err, rows) => {
      connection.release();
      if (err) {
        res.json({ code: 100, status: 'Query failed in DB' });
      } else {
        res.json({
          departments: [
            {

              self: `http://localhost:8090/api/departments/${res.department_id}`,
              id: `${res.department_id}`,
              name: `${res.name}`
            }
          ]
        });
      }
    });
  });
});




module.exports = router;
