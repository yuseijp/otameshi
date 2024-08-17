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


app.get("/create", (request, responce) => {
  responce.send("create");
});
app.get("/read", (request, responce) => {
  pgClient.connect();

  pgClient.query("select * from key_value")
    .then(res => {
      console.log(res.rows[0]);
      res.send(res.rows[0]);
    }).catch(e => {
      console.error(e.stack);
    }).finally(() => {
      pgClient.end();
    })
  ;
    // responce.send("read");
});
app.get("/update", (request, responce) => {
  responce.send("update");
});
app.get("/delete", (request, responce) => {
  responce.send("delete");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
