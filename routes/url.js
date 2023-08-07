var express = require("express");
const Url = require("../models/url");

var router = express.Router();

router.post("/shorturl/new", function (req, res) {
  const { url } = req.body;
});

router.post("/shorturl/:id", function (req, res, next) {});

module.exports = router;
