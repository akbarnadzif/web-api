var express = require("express");
var app = express();

const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "transaksi"
});
conn.connect();

app.get("/", function(req, res) {
  conn.query("SELECT * FROM data_transaksi", function(error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "Data Transaksi!"
    });
  });
});

//POST DATA transportasi
app.post("/", function(req, res) {
  var datatransportasi = {
    nama: req.body.nama,
    lokasi_awal: req.body.lokasi_awal,
    lokasi_tujuan: req.body.lokasi_tujuan,
    jumlah_pnmpg: req.body.jumlah_pnmpg
  };
  // var ojol = { id: "3", nama: "Mas Ali" };
  conn.query("INSERT INTO data_transaksi SET ?", datatransportasi, function(
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

//DELETE DATA By ID
app.delete("/:id", (req, res) => {
  conn.query("DELETE FROM data_transaksi WHERE id=?", req.params.id, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "Data deleted!" });
  });
});

//UPDATE DATA By ID
app.put("/:id", (req, res) => {
  req.params.id;
  var dataupdate = {
    nama: req.body.nama,
    lokasi_awal: req.body.lokasi_awal,
    lokasi_tujuan: req.body.lokasi_tujuan,
    jumlah_pnmpg: req.body.jumlah_pnmpg
  };
  conn.query(
    "UPDATE data_transaksi SET ? WHERE id=?",
    [dataupdate, req.params.id],
    function(error, results, fields) {
      if (error) throw error;
      res.send({
        error: false,
        data: results,
        json: dataupdate
      });
    }
  );
});

module.exports = app;
