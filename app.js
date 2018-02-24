var express = require("express");
var db = require("./db");
var cors = require("cors");

var app = express();
app.use(cors());

var requestify = require("requestify");

const url = `https://sv2.ideamarthosting.dialog.lk/mahesh950218Apps/deadlock/sms.php`;

function send() {
  console.log("call");
  requestify
    .get(url, {
      params: {
        number: "0766764493"
      }
    })
    .then(function(response) {
      // Get the response body (JSON parsed or jQuery object for XMLs)
      response.getBody();
    });
}

send();

var TestController = require("./test/TestController");
app.use("/api/", TestController);

var UserController = require("./user/UserController");
app.use("/api/users", UserController);

var FacultyController = require("./faculty/FacultyController");
app.use("/api/faculties", FacultyController);

module.exports = app;
