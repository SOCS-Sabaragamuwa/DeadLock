var express = require("express");
var app = express();
var db = require("./db");

var UserController = require("./user/UserController");
app.use("/api/users", UserController);

var FacultyController = require("./faculty/FacultyController");
app.use("/api/faculties", FacultyController);

module.exports = app;
