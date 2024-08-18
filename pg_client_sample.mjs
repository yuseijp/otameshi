// 最も簡単なPostgres接続サンプル（単一クライアント版）。
// RDB（Relational Database）のひとつであるPostgreSQLに接続し、検索するための最小プログラム。

import pkg from "pg"; 
import dotenv from "dotenv";

const { Client } = pkg;
dotenv.config();	// envファイルに記載された環境変数を読み込み、process.envオブジェクトに設定。

const pgClient = new Client({
	host: process.env.DB_HOST,            // データベースが稼働するホスト。
	port: process.env.DB_PORT,            // ポート番号。
	database: process.env.DB_DATABASE,    // データベース名。
	user: process.env.DB_USER,            // データベースユーザーID。
	password: process.env.DB_PASSWORD,    // データベースパスワード。
	connectionTimeoutMillis: 2000,	// データベースへの接続完了まで2秒以上かかったらエラー。
});
	
const readProc = async(params) => {
	pgClient.connect();
	let result = null;
	try {
		result = await pgClient.query("select * from key_value where key = 'key1'");
		console.log(result.rows[0]);
		result = await pgClient.query("select * from key_value where key = 'key2'");
		console.log(result.rows[0]);
	} catch(err) {
		throw err;
	} finally {
		pgClient.end();
	}
}

readProc();
