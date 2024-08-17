// 最も簡単なPostgres接続サンプル（単一クライアント版）。
// RDB（Relational Database）のひとつであるPostgreSQLに接続し、検索するための最小プログラム。

import pkg from "pg"; 
const { Client } = pkg;

var pgClient = new Client({
	host: "localhost",			// データベースが稼働するホスト。
	port: 5432,						// ポート番号。
	database: "postgres",			// データベース名。
	user: "postgres",			// データベースユーザーID。
	password: "password",	// データベースパスワード。
	connectionTimeoutMillis: 2000,	// データベースへの接続完了まで2秒以上かかったらエラー。
});

pgClient.connect();

pgClient.query("select * from key_value")
	.then(res => {
		console.log(res.rows[0])
	}).catch(e => {
		console.error(e.stack)
	}).finally(() => {
		pgClient.end()
	});
