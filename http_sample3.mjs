// HTTPサンプル。
// node http_sample.mjs
// （ブラウザーから）http://localhost:3000/(create|read|update|delete)
import express from "express";
import pkg from "pg"; 
import dotenv from "dotenv";
import * as su from "./stringUtils.mjs";

// Postgres設定。 
const { Pool } = pkg;
dotenv.config();	// envファイルに記載された環境変数を読み込み、process.envオブジェクトに設定。

const pgPool = new Pool({
	host: process.env.DB_HOST,            // データベースが稼働するホスト。
	port: process.env.DB_PORT,            // ポート番号。
	database: process.env.DB_DATABASE,    // データベース名。
	user: process.env.DB_USER,            // データベースユーザーID。
	password: process.env.DB_PASSWORD,    // データベースパスワード。
	connectionTimeoutMillis: 2000,	// データベースへの接続完了まで2秒以上かかったらエラー。
});

const readProc = async(params) => {
	const pgClient = await pgPool.connect();
	let result = null;
	try {
		let sql = "select * from key_value";
		if (params.key) {	// パラメーターに値が指定されているときはその値で絞り込む。
			sql += ` where key = '${params.key}'`;
		}
		result = await pgClient.query(sql);
		console.log(su.pr("result", JSON.stringify(result.rows)));
		return result.rows[0];
	} catch(err) {
		throw err;
	} finally {
		pgClient.release();
	}
};

// Express設定。
const app = express();
const port = 3000;

// ルーティング設定。
app.get("/create", (req, res) => {
  res.send("create");
});

app.get("/read", async(req, res) => {
	const result = await readProc(req.query);
	res.send(result);
});

app.get("/update", (req, res) => {
  res.send("update");
});

app.get("/delete", (req, res) => {
  res.send("delete");
});

// リクエスト待ち受け。
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
