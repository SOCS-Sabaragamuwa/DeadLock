var express = require("express");
var db = require("./db");
var cors = require("cors");

var app = express();
app.use(cors());

//
// var requestify = require("requestify");
//
// const url = `https://sv2.ideamarthosting.dialog.lk/mahesh950218Apps/deadlock/sms.php`;
//
// function send() {
//   console.log("call");
//   requestify
//     .get(url, {
//       params: {
//         number: "0766764493"
//       }
//     })
//     .then(function(response) {
//       // Get the response body (JSON parsed or jQuery object for XMLs)
//       response.getBody();
//     });
// }

var TestController = require("./test/TestController");
app.use("/api/", TestController);

var UserController = require("./user/UserController");
app.use("/api/users", UserController);

var FacultyController = require("./faculty/FacultyController");
app.use("/api/faculties", FacultyController);

var DepartmentController = require("./department/DepartmentController");
app.use("/api/departments", DepartmentController);


var DegreeController = require("./degree/DegreeController");
app.use("/api/degrees", DegreeController);


module.exports = app;
