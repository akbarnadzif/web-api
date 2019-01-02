const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);

// JUDUL:
// Aplikasi Rekomendasi Transpotasi Online
// PENJELASAN:
// aplikasi ini merupakan aplikasi untuk pembanding jasa transportasi online untuk menentukan
// pilihan terbaik berdasar nilai harga dan kualitas. Input data yang olah menggunakan metode fuzzy
// BAGAIMANA:
// untuk proses perhitungannya adalah dari 2 input data yang di kelola yakni harga dan kualitas.
// Nilai harga didapat dari masing-masing jasa transportasi online, sedangkan nilai kualitas di peroleh
// dari data rating driver dan rating aplikasi.
// TUJUAN:
// tujuan dari aplikasi ini adalah untuk membantu pengguna transportasi online untuk membandingkan jasa
// transportasi terbaik berdasar data yang di proses menggunakan metode fuzzy
// KEUNGGULAN:
