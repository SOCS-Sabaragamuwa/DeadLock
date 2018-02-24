var express = require("express");
var db = require("./db");
var cors = require("cors");

var app = express();
app.use(cors());

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
