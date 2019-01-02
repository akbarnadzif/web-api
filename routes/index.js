var express = require("express");
var app = express();

app.get("/", function(req, res) {
  console.log("TEST INDEX");
  res.render("index", { title: "Halaman Dashboard" });
});
module.exports = app;

// var router = express.Router();
//aljabar rasional, sql dasar, smpek bab 7, 8
