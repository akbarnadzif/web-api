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
  conn.query("SELECT * FROM tbl_data_driver", function(error, results, fields) {
    if (error) throw error;
    // return res.send({
    //   error: false,
    //   data: results,
    //   message: "Data Driver!"
    // });
    res.render("driver", { title: "User", data_driver: results });
  });
});

app.post("/", function(req, res) {
  var datadriver = {
    nama: req.body.nama,
    usia: req.body.usia,
    rating_driver: req.body.rating_driver,
    rating_aplikasi: req.body.rating_aplikasi,
    plat_nomor: req.body.plat_nomor,
    createdAt: new Date()
  };
  // var ojol = { id: "3", nama: "Mas Ali" };
  conn.query("INSERT INTO tbl_data_driver SET ?", datadriver, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: "Data Berhasil di masukkan!",
      json: datadriver
    });
  });
});

app.delete("/:id", (req, res) => {
  conn.query(
    "DELETE FROM tbl_data_driver WHERE id_data_driver=?",
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
  var dataupdate = {
    nama: req.body.nama,
    usia: req.body.usia,
    rating_driver: req.body.rating_driver,
    rating_aplikasi: req.body.rating_aplikasi,
    plat_nomor: req.body.plat_nomor,
    createdAt: new Date()
  };
  conn.query(
    "UPDATE tbl_data_driver SET ? WHERE id_data_driver=?",
    [dataupdate, req.params.id],
    function(error, results, fields) {
      if (error) throw error;
      res.send({
        error: false,
        msg: "Data di update!",
        json: dataupdate
      });
    }
  );
});
module.exports = app;
