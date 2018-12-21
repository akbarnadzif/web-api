const express = require("express");
// const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
var path = require("path");
var ejs = require("ejs");
var methodOverride = require("method-override");

var indexRouter = require("./routes/index");
var driverRouter = require("./routes/driver");
var tarifRouter = require("./routes/tarif");

var transaksiRouter = require("./routes/transaksi");
var dataDriverRouter = require("./routes/datadriver");
var dataTarifRouter = require("./routes/datatarif");
var transportasiRouter = require("./routes/transportasi");
const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_transportasi"
});
conn.connect();

app.get("/fuzzy", function(req, res) {
  conn.query(
    "SELECT nama, (rating_driver+rating_aplikasi)/2 rating, tarif_tunai_perKm, tarif_nontunai_perKm from tbl_transportasi",
    function(error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.send("HALOO");
    }
  );
});
app.use("/index", indexRouter);
app.use("/driver", driverRouter);
app.use("/tarif", tarifRouter);

app.use("/transaksi", transaksiRouter);
app.use("/datadriver", dataDriverRouter);
app.use("/datatarif", dataTarifRouter);
app.use("/transportasi", transportasiRouter);

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.listen(3000, function() {
  console.log("Node.Js server is running on PORT 3000");
});

module.exports = app;

// app.get("/", function(req, res) {
//   return res.send({ error: true, message: "Hello Last Project!" });
// });
// const conn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "transaksi"
// });

// conn.connect();
// app.get("/trans", function(req, res) {
//   conn.query("SELECT * FROM data_transaksi", function(error, results, fields) {
//     if (error) throw error;
//     return res.send({
//       error: false,
//       data: results,
//       message: "Data Transaksi!"
//     });
//   });
// });
