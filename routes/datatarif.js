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

app.get("/", function(req, res) {
  conn.query("SELECT * FROM tbl_data_tarif", function(error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "Data Tarif!"
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
    createdAt: new Date()
  };
  // var ojol = { id: "3", nama: "Mas Ali" };
  conn.query("INSERT INTO tbl_data_tarif SET ?", datatarif, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: "Data Berhasil di masukkan!",
      json: datatarif
    });
  });
});

app.delete("/:id", (req, res) => {
  conn.query(
    "DELETE FROM tbl_data_tarif WHERE id_data_tarif=?",
    req.params.id,
    function(error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Data dihapus!"
      });
    }
  );
});

app.put("/:id", (req, res) => {
  req.params.id;
  var datatarif = {
    lokasi_awal: req.body.lokasi_awal,
    lokasi_tujuan: req.body.lokasi_tujuan,
    jarak: req.body.jarak,
    tarif_tunai: req.body.tarif_tunai,
    tarif_nontunai: req.body.tarif_nontunai,
    createdAt: new Date()
  };
  conn.query(
    "UPDATE tbl_data_tarif SET ? WHERE id_data_tarif=?",
    [datatarif, req.params.id],
    function(error, results, fields) {
      if (error) throw error;
      res.send({
        error: false,
        msg: "Data di update!",
        json: datatarif
      });
    }
  );
});

module.exports = app;
