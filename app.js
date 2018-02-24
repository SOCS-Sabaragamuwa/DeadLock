var express = require("express");
var db = require("./db");
var cors = require("cors");

var app = express();
app.use(cors());

var TestController = require("./test/TestController");
app.use("/api/", TestController);

var UserController = require("./user/UserController");
app.use("/api/users", UserController);

module.exports = app;
