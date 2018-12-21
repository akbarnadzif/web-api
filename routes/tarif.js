var express = require("express");
var app = express();
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_transportasi"
});
conn.connect();

app.get("/hapus/:id", (req, res) => {
  conn.query(
    "DELETE FROM tbl_data_tarif WHERE id_data_tarif=?",
    req.params.id,
    function(error, results, fields) {
      if (error) throw error;
      res.redirect("/tarif");
    }
  );
});

app.get("/", function(req, res) {
  console.log("Test Dashboard Tarif");
  conn.query("SELECT * FROM tbl_data_tarif", function(error, results, fields) {
    if (error) throw error;
    conn.query("SELECT * FROM tbl_transportasi", function(
      error1,
      results1,
      fields1
    ) {
      res.render("tarif", {
        title: "Tarif",
        data_tarif: results,
        data_trans: results1
      });
    });
  });
});

app.post("/", function(req, res) {
  var datatarif = {
    lokasi_awal: req.body.lokasi_awal,
    lokasi_tujuan: req.body.lokasi_tujuan,
    jarak: req.body.jarak,
    tarif_tunai: req.body.tarif_tunai,
    tarif_nontunai: req.body.tarif_nontunai,
    id_transportasi: req.body.id_transportasi,
    createdAt: new Date()
  };
  conn.query("INSERT INTO tbl_data_tarif SET ?", datatarif, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.redirect("/tarif");
  });
});

// app.get("/", function(req, res) {
//   console.log("TEST INDEX");
//   res.render("tarif", { title: "Input Data Tarif" });
// });
module.exports = app;
