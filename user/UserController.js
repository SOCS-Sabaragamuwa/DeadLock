var express = require("express");
var router = express.Router();
var getUser = require("./User");

// test a user simply from database
router.get("/test", function(req, res) {
  getUser(req, res);
});

module.exports = router;
