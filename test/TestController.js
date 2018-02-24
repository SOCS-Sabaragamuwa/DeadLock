var express = require("express");
var router = express.Router();
const pool = require("../db");
var generator = require("generate-password");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// test a user simply from database
router.get("/", function(req, res) {
  res.json({ code: 200, status: "Ok" });
});

module.exports = router;
