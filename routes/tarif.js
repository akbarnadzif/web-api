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
      conn.query(
        `UPDATE tbl_transportasi
        LEFT JOIN
        (SELECT ROUND(avg(tbl_data_tarif.tarif_tunai/tbl_data_tarif.jarak),-1) tarif_tunai,id_transportasi from tbl_data_tarif group by id_transportasi) as x
        on x.id_transportasi = tbl_transportasi.id_transportasi
        set tbl_transportasi.tarif_tunai_perKm=x.tarif_tunai`,
        function(error2, results2, fields2) {
          if (error2) throw error2;
          res.redirect("/tarif");
        }
      );
      // res.redirect("/tarif");
    }
  );
});

app.get("/", function(req, res) {
  console.log("Get data tarif!!!");
  conn.query(
    `SELECT tbl_transportasi.nama as nama_transportasi, tbl_data_tarif.* FROM tbl_data_tarif LEFT JOIN tbl_transportasi 
  ON tbl_transportasi.id_transportasi=tbl_data_tarif.id_transportasi ORDER BY id_transportasi`,
    function(error, results, fields) {
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
    }
  );
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
    conn.query(
      `UPDATE tbl_transportasi
      LEFT JOIN
      (SELECT ROUND(avg(tbl_data_tarif.tarif_tunai/tbl_data_tarif.jarak),-1) tarif_tunai,id_transportasi from tbl_data_tarif group by id_transportasi) as x
      on x.id_transportasi = tbl_transportasi.id_transportasi
      set tbl_transportasi.tarif_tunai_perKm=x.tarif_tunai`,
      function(error2, results2, fields2) {
        if (error2) throw error2;
        res.redirect("/tarif");
      }
    );
    // res.redirect("/tarif");
  });
});

// UPDATE tbl_transportasi
//        LEFT JOIN
//        (SELECT avg(tbl_data_driver.rating_driver) rating_driver,id_transportasi from tbl_data_driver group by id_transportasi) as x
//        on x.id_transportasi = tbl_transportasi.id_transportasi
//        set tbl_transportasi.rating_driver=x.rating_driver
// app.get("/", function(req, res) {
//   console.log("TEST INDEX");
//   res.render("tarif", { title: "Input Data Tarif" });
// });
module.exports = app;
