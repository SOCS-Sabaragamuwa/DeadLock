var express = require("express");
var router = express.Router();
const pool = require("../db");
// const passwordValidator = require("./PasswordValidator");
var generator = require("generate-password");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// save a user to database
router.post("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.status(100).json({ message: "Error in connection database" });
    }

    let email = req.body.email;
    let password = req.body.password;

    // check for email availability
    if (!email) {
      return res.status(400).json({ message: "Email is not set" });
    }

    // check for validity of password
    if (password) {
      let response = false;
      if (
        password == password.toUpperCase() &&
        password == password.toLowerCase() &&
        (password.length <= 8) | (password.length >= 6)
      ) {
        response = true;
      }
      if (!response) {
        return res.status(400).json({
          status: 400,
          message: "Password complexity requirement not met",
          developerMessage:
            "User creation failed because password complexity requirement not met"
        });
      }
    }

    if (!password) {
      password = generator.generate({
        length: 7,
        symbols: true,
        uppercase: true,
        numbers: true
      });
    }

    //check whether email is already registered
    connection.query(
      `SELECT * FROM user WHERE email='${email}'`,

      (err, result) => {
        if (err) {
          res.status(100).json({ message: "Error in mysql query" });
        } else {
          if (result.length > 0) {
            connection.release();
            res.status(409).json({
              status: 409,
              message: `A user with email: ${email} already exists.`,
              developerMessage: `User creation failed because the email: ${
                email
              } already exists.`
            });
          } else {
            connection.query(
              `INSERT INTO user(email,password) VALUES('${email}','${
                password
              }')`,

              (err, result) => {
                connection.release();
                if (err) {
                  res
                    .status(400)
                    .json({ status: 400, message: "Email is not set" });
                } else {
                  res.status(201).json({
                    status: 201,
                    self: `http://localhost:8090/api/users/${result.insertId}`,
                    email: email
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
