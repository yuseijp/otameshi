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
	// pgClient.connect()
	const query = "select * from key_value";
	
	pgClient.query(query)
	.then(
			function(result)  {
				console.log(result.rows)
				res.send(JSON.stringify(result.rows))
			}
	)
	.catch(e => console.error(e.stack))
	// .finally(() => pgClient.end())
})

// app.get("/read", (req, res) => {
//   pgClient.connect();

// pgClient.query("select * from key_value")
  //   .then(res => {
  //     console.log(res.rows[0]);
  //     res.send(JSON.stringify(res.rows[0]));
  //   }).catch(e => {
  //     console.error(e.stack);
  //   }).finally(() => {
  //     pgClient.end();
  //   })
  // ;
    // res.send("read");
// });
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
