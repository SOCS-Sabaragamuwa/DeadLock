var express = require("express");
var app = express();
var db = require("./db");

var TestController = require("./test/TestController");
app.use("/api/", TestController);

var UserController = require("./user/UserController");
app.use("/api/users", UserController);

module.exports = app;
