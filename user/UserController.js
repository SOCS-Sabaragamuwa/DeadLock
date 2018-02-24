var express = require("express");
var router = express.Router();
const pool = require("../db");
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
    let mobile = req.body.mobile;

    // check for email availability
    if (!email) {
      res.status(400).json({ message: "Email is not set" });
      return;
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
            // check for mobile number availability
            if (mobile) {
              if (typeof mobile == "number" && mobile.length === 10) {
                //update user with mobile number if mobile num is given
                connection.query(
                  `UPDATE user SET mobileNo = ${mobile} WHERE email = ${email}`,
                  (err, result) => {
                    connection.release();
                    if (err) {
                      res.status(400).json({
                        status: 400,
                        message: "Failed to update mobile number (Query Issue)"
                      });
                    } else {
                      res.status(201).json({
                        status: 201,
                        self: `http://localhost:8090/api/users/${
                          result.insertId
                        }`,
                        email: email,
                        mobile: mobile
                      });
                    }
                  }
                );
              } else {
                res.status(400).json({
                  status: 400,
                  message: "Failed to update mobile number (Query Issue)"
                });
              }
            } else {
              res.status(409).json({
                status: 409,
                message: `A user with email: ${email} already exists.`,
                developerMessage: `User creation failed because the email: ${
                  email
                } already exists.`
              });
            }
          } else {
            //insert new email
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
