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
  console.log("Test Dashboard Driver");
  // res.render("driver", { title: "Input Data Driver" });
  conn.query("SELECT * FROM tbl_data_driver", function(error, results, fields) {
    if (error) throw error;
    // return res.send({
    //   error: false,
    //   data: results,
    //   message: "Data Driver!"
    // });
    res.render("driver", { title: "Driver", data_driver: results });
  });
});
app.get("/trans", function(req, res) {
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
    // return res.send({
    //   error: false,
    //   data: "Data Berhasil di masukkan!",
    //   json: datadriver
    // });
    // res.header({ "Content-Type": "text/plain" }, 0);

    // res.render("driver", { data_driver: results });
    res.redirect("/driver");
  });
});

// app.delete("/:id", (req, res) => {
//   conn.query(
//     "DELETE FROM tbl_data_driver WHERE id_data_driver=?",
//     req.params.id,
//     function(error, results, fields) {
//       if (error) throw error;
//       return res.send({
//         error: false,
//         data: results,
//         message: "Data dihapus!"
//       });
//     }
//   );
// });
module.exports = app;
