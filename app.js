var express = require("express");
var app = express();
var db = require("./db");

// var UserController = require("./user/UserController");
app.use("/", function(req, res) {
  if (res) {
    res.json({ code: 200, status: "OK" });
  } else {
    res.json({ code: 100, status: "Api Issue" });
  }
});

// app.use("/api/users", UserController);

module.exports = app;
