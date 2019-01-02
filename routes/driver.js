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
    "DELETE FROM tbl_data_driver WHERE id_data_driver=?",
    req.params.id,
    function(error, results, fields) {
      if (error) throw error;
      // return res.send({
      //   error: false,
      //   data: results,
      //   message: "Data dihapus!"
      // });
      res.redirect("/driver");
    }
  );
});

app.get("/", function(req, res) {
  console.log("Get data driver!!!");
  // res.render("driver", { title: "Input Data Driver" });
  conn.query(
    `SELECT tbl_transportasi.nama as nama_transportasi, tbl_data_driver.* FROM tbl_data_driver LEFT JOIN tbl_transportasi 
  ON tbl_transportasi.id_transportasi=tbl_data_driver.id_transportasi ORDER BY id_transportasi`,
    function(error, results, fields) {
      if (error) throw error;
      conn.query("SELECT * FROM tbl_transportasi", function(
        error1,
        results1,
        fields1
      ) {
        res.render("driver", {
          title: "Driver",
          data_driver: results,
          data_trans: results1
        });
        console.log(results1);
      });
      // return res.send({
      //   error: false,
      //   data: results,
      //   message: "Data Driver!"
      // });
    }
  );
});
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
    res.render("driver", { title: "Transportasi", data_trans: results });
  });
});
app.post("/", function(req, res) {
  var datadriver = {
    nama: req.body.nama,
    usia: req.body.usia,
    rating_driver: req.body.rating_driver,
    plat_nomor: req.body.plat_nomor,
    id_transportasi: req.body.id_transportasi,
    createdAt: new Date()
  };
  // var ojol = { id: "3", nama: "Mas Ali" };
  conn.query("INSERT INTO tbl_data_driver SET ?", datadriver, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.redirect("/driver");
    // return res.render({
    //   error: false,
    //   data: "Data Berhasil di masukkan!",
    //   json: datadriver
    // });
    // conn.query(
    //   `UPDATE tbl_transportasi
    //   LEFT JOIN
    //   (SELECT avg(tbl_data_driver.rating_driver) rating_driver,id_transportasi from tbl_data_driver group by id_transportasi) as x
    //   on x.id_transportasi = tbl_transportasi.id_transportasi
    //   set tbl_transportasi.rating_driver=x.rating_driver`,
    //   function(error2, results2, fields2) {
    //     if (error2) throw error2;
    //     res.redirect("/driver");
    //   }
    // );
    // return res.send({
    //   error: false,
    //   data: "Data Berhasil di masukkan!",
    //   json: datadriver
    // });
    // res.header({ "Content-Type": "text/plain" }, 0);

    // res.render("driver", { data_driver: results });
  });
});

module.exports = app;
// CREATE TRIGGER `after_insert_data_driver` AFTER INSERT ON `tbl_data_driver` FOR EACH ROW UPDATE tbl_transportasi INNER JOIN (SELECT avg(tbl_data_driver.rating_driver) rating_driver,id_transportasi from tbl_data_driver) as x on x.id_transportasi = tbl_transportasi.id_transportasi set tbl_transportasi.rating_driver=x.rating_driver
