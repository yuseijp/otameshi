// HTTPサンプル。
// node http_sample.mjs
// （ブラウザーから）http://localhost:3000/

import express from "express";
import pkg from "pg"; 

const app = express();
const port = 3000;
const { Client } = pkg;

var pgClient = new Client({
	host: "localhost",			// データベースが稼働するホスト。
	port: 5432,						// ポート番号。
	database: "postgres",			// データベース名。
	user: "postgres",			// データベースユーザーID。
	password: "password",	// データベースパスワード。
	connectionTimeoutMillis: 2000,	// データベースへの接続完了まで2秒以上かかったらエラー。
});
pgClient.connect()

app.get("/create", (req, res) => {
  res.send("create");
});

app.get("/read", function (req, res) {
	readProc(req.query);
});
app.get("/update", (req, res) => {
  res.send("update");
});
app.get("/delete", (req, res) => {
  res.send("delete");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

pgClient.end();
