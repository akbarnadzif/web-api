var express = require("express");
var methodOverride = require("method-override");
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
    conn.query("SELECT * FROM tbl_perusahaan", function(
      error1,
      results1,
      fields1
    ) {
      res.render("transportasi", {
        title: "Transportasi",
        data_trans: results,
        data_perus: results1
      });
    });
    // return res.send({
    //   error: false,
    //   message: "Data Transportasi!",
    //   data: results
    // });
  });
});

app.post("/", function(req, res) {
  var datatransportasi = {
    nama: req.body.nama,
    // rating: req.body.rating,
    rating_aplikasi: req.body.rating_aplikasi,
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
    // return res.send({
    //   error: false,
    //   data: "Data Berhasil di masukkan!",
    //   json: datatransportasi
    // });
    res.redirect("/transportasi");
  });
});

app.delete("/:id", (req, res) => {
  conn.query(
    "DELETE FROM tbl_transportasi WHERE id_transportasi=?",
    req.params.id,
    function(error, results, fields) {
      if (error) throw error;
      // return res.send({
      //   error: false,
      //   data: results,
      //   message: "Data dihapus!"
      // });
      res.json({ msg: `Data ID:${req.params.id} di hapus!` });
      res.redirect("/transportasi");
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
