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

console.log("Fuzzy!!!");
app.get("/", function(req, res) {
  conn.query(
    "SELECT nama, (rating_driver+rating_aplikasi)/2 rating, tarif_tunai_perKm, tarif_nontunai_perKm from tbl_transportasi",
    function(error, results, fields) {
      if (error) throw error;
      // var data = [];
      // results.forEach(function(o, key) {
      //   console.log(o);
      //   data.push([o.nama, o.rating_driver, o.harga_tunai_perKm]);
      // });
      console.log(results);
      var data = [
        ["goride", 4.4, 1600],
        ["gocar", 4.4, 4100],
        ["gocarlarge", 4.4, 4800],
        ["gobluebird", 4.4, 5300],
        ["grabbike", 4.4, 1600],
        ["grabcar", 4.4, 3800],
        ["grabcar6", 4.4, 4500],
        ["grabtaxi", 4.4, 5200],
        ["mybluebird", 3.7, 6000],
        ["mybluebirdvan", 3.7, 5000],
        ["bajaj", 3.6, 4000],
        ["bangjek", 3.4, 1600],
        ["okejack", 4.0, 2000]
      ];

      var a = 0,
        b = 3,
        c = 3.5,
        d = 4,
        e = 4.5,
        f = 5;
      var a1 = 0,
        b1 = 1000,
        c1 = 2000,
        d1 = 4000,
        e1 = 6000,
        f1 = 7000;

      var harga_ojol = [];
      var kual_ojol = [];
      var harga_kual = [];
      var sum_hargakual = [];
      var sum_hargakualsingleton = [];
      var kalisingleton = [];
      var singleton = [
        [100, 100, 80, 60, 60],
        [100, 80, 60, 60, 60],
        [80, 60, 60, 60, 40],
        [60, 60, 60, 40, 20],
        [60, 60, 40, 20, 20]
      ];
      var outputakhir = [];

      //Cek pembobotan RATING
      for (i = 0; i < data.length; i++) {
        kual_ojol[i] = [];

        console.log(" ");
        console.log("RATING : " + data[i][1]);
        console.log("----------------");
        kual_ojol[i][0] = trapesiumkiri(data[i][1], b, c, "Sangat Buruk");
        kual_ojol[i][1] = segitiga(data[i][1], b, c, d, "Buruk");
        kual_ojol[i][2] = segitiga(data[i][1], c, d, e, "Sedang");
        kual_ojol[i][3] = segitiga(data[i][1], d, e, f, "Baik");
        kual_ojol[i][4] = trapesiumkanan(data[i][1], e, f, "Sangat Baik");
        console.log("DATA Fuzzy KUALITAS" + i + " :" + kual_ojol[i]);
      }

      //Cek pembobotan HARGA
      for (i = 0; i < data.length; i++) {
        harga_ojol[i] = [];
        console.log("----------------");
        console.log("Harga : " + data[i][2]);
        harga_ojol[i][0] = trapesiumkanan(data[i][2], e1, f1, "Sangat Mahal");
        harga_ojol[i][1] = segitiga(data[i][2], d1, e1, f1, "Mahal");
        harga_ojol[i][2] = segitiga(data[i][2], c1, d1, e1, "Sedang");
        harga_ojol[i][3] = segitiga(data[i][2], b1, c1, d1, "Murah");
        harga_ojol[i][4] = trapesiumkiri(data[i][2], b1, c1, "Sangat Murah");
        console.log("DATA Fuzzy HARGA" + i + " :" + harga_ojol[i]);
      }

      //Cek TAHAP MIX
      for (i = 0; i < data.length; i++) {
        harga_kual[i] = [];
        for (j = 0; j < 5; j++) {
          harga_kual[i][j] = [];
          for (k = 0; k < 5; k++) {
            harga_kual[i][j][k] = Math.max(harga_ojol[i][j], kual_ojol[i][k]);
          }
        }
      }

      //Hitung JUMLAH
      for (i = 0; i < data.length; i++) {
        sum_hargakual[i] = arrSum(harga_kual[i]);
        console.log(sum_hargakual[i]);
      }

      //Mengalikan harga singleton
      for (i = 0; i < data.length; i++) {
        kalisingleton[i] = [];
        for (j = 0; j < 5; j++) {
          kalisingleton[i][j] = [];
          for (k = 0; k < 5; k++) {
            kalisingleton[i][j][k] = harga_kual[i][j][k] * singleton[j][k];
          }
        }
      }

      //console.log("KALISINGLETON :" + kalisingleton[0]);
      //KALI 2 ARRAY
      for (i = 0; i < data.length; i++) {
        sum_hargakualsingleton[i] = arrSum(kalisingleton[i]);
        console.log(sum_hargakualsingleton[i]);
      }

      // PRINT HASIL AKHIR
      console.log("\nHASIL AKHIR :");
      for (i = 0; i < data.length; i++) {
        outputakhir[i] = sum_hargakualsingleton[i] / sum_hargakual[i];
        // console.log(data[i][0] + ":" + outputakhir[i]);
      }

      // PRINT HASIL AKHIR 2
      var temp_datanama_nilaifuzzy = [];
      for (i = 0; i < outputakhir.length; i++) {
        // console.log([i + 1] + "." + data[i][0] + ":" + simpan_sort_outputakhir[i]);
        temp_datanama_nilaifuzzy.push({
          No: [i + 1],
          nama: data[i][0],
          nilai_fuzzy: outputakhir[i]
        });
      }
      temp_datanama_nilaifuzzy.sort(function(a, b) {
        return a.nilai_fuzzy - b.nilai_fuzzy;
      });
      // console.log(temp_datanama_nilaifuzzy);

      for (i = 0; i < temp_datanama_nilaifuzzy.length; i++) {
        console.log(
          [i + 1] +
            " " +
            temp_datanama_nilaifuzzy[i].nama +
            " : " +
            temp_datanama_nilaifuzzy[i].nilai_fuzzy
        );
      }

      function segitiga(x, a, b, c, ket) {
        var hasil;
        if (x > a && x <= b) hasil = (x - a) / (b - a);
        else if (x > b && x <= c) hasil = (c - x) / (c - b);
        else hasil = 0;
        console.log(ket + " : " + hasil);
        return hasil;
      }
      function trapesiumkiri(x, a, b, ket) {
        var hasil;
        if (x <= a) hasil = 1;
        else if (x > a && x <= b) hasil = (b - x) / (b - a);
        else hasil = 0;

        console.log(ket + " : " + hasil);
        return hasil;
      }
      function trapesiumkanan(x, a, b, ket) {
        var hasil;
        if (x <= a) hasil = 0;
        else if (x > a && x <= b) hasil = (x - a) / (b - a);
        else hasil = 1;

        console.log(ket + " : " + hasil);
        return hasil;
      }

      function arrSum(arr) {
        var sum = 0;
        arr.forEach(function(v) {
          if (typeof v == "object") sum += arrSum(v);
          else sum += v;
        });
        return sum;
      }
      res.json(temp_datanama_nilaifuzzy);
    }
  );
});

module.exports = app;

// var angka = [2.2, 3.6, 2.5, 9.3, 5.3, 5.1, 9.1];
// function test() {
//   angka.sort(function(a, b) {
//     return b - a;
//   });
// }
// console.log(angka.sort(function(a,b) {return b-a});

// for (i = 0; i < harga.length; i++) {
// console.log("harga :" + harga.sort());
// }

// var harga = [
//   1600,
//   4100,
//   4800,
//   5300,
//   1600,
//   3800,
//   4500,
//   5200,
//   6000,
//   5000,
//   4000,
//   1600,
//   2000
// ];
