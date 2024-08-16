// HTTPサンプル。
// node http_sample.mjs
// （ブラウザーから）http://localhost:3000/

import express from "express";

const app = express();
const port = 3000;

function doit1(req, res) {
  res.send("Hello World! #1");
}
function doit2(req, res) {
  res.send("Hello World! #2");
}
function doit3(req, res) {
  res.send("Hello World! #3");
}

app.get("/RSV_P/doit1", doit1);
app.get("/doit2", doit2);
app.get("/doit3", doit3);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
