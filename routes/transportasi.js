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
  console.log("GET DATA from tbl_transportation");
  conn.query("SELECT * FROM tbl_transportasi", function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    // return res.send({
    //   error: false,
    //   message: "Data Transportasi!",
    //   data: results
    // });
    res.render("transportasi", { title: "Transportasi", data_trans: results });
  });
});

app.post("/", function(req, res) {
  var datatransportasi = {
    nama: req.body.nama,
    rating: req.body.rating,
    tarif_tunai_perKm: req.body.tarif_tunai_perKm,
    tarif_nontunai_perKm: req.body.tarif_nontunai_perKm,
    jumlah_penumpang: req.body.jumlah_penumpang,
    deskripsi: req.body.deskripsi
  };
  console.log("POST DATA to tbl_transportation");
  conn.query("INSERT INTO tbl_transportasi SET ?", datatransportasi, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: "Data Berhasil di masukkan!",
      json: datatransportasi
    });
  });
});

app.delete("/:id", (req, res) => {
  conn.query(
    "DELETE FROM tbl_transportasi WHERE id_transportasi=?",
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
  var datatransportasi = {
    nama: req.body.nama,
    rating: req.body.rating,
    tarif_tunai_perKm: req.body.tarif_tunai_perKm,
    tarif_nontunai_perKm: req.body.tarif_nontunai_perKm,
    jumlah_penumpang: req.body.jumlah_penumpang,
    deskripsi: req.body.deskripsi
  };
  conn.query(
    "UPDATE tbl_transportasi SET ? WHERE id_transportasi=?",
    [datatransportasi, req.params.id],
    function(error, results, fields) {
      if (error) throw error;
      res.send({
        error: false,
        msg: "Data di update!",
        json: datatransportasi
      });
    }
  );
});

module.exports = app;
