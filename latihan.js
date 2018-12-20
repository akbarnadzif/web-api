console.log("FIBONACI");
var a = 0,
  b = 1;
for (i = 0; i < 10; i++) {
  var temp = a;
  a = a + b;
  b = temp;
  console.log(b + " ");
}
