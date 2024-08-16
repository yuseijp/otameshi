// ログインサンプル。
// Shellより以下を実行。
// bash（あるいはPowerShell、コマンドプロンプト）にてnode login_sample.js
//ブラウザーから実行確認する（http://localhost:3000）。

import express from "express";
import session from "express-session";
import bodyParser from "body-parser";

const app = express();

// セッションオブジェクトの設定。
const sess = {
	secret: "secret secret",
	cookie: {
		maxAge: 60 * 1000,	// セッションは1分しか持たない設定（ミリ秒単位で指定）。
	},
	resave: true,
	rolling: true,
	saveUninitialized: false,
};

// セッションを使用する。
app.use(session(sess));

// POSTで受け取ったreq.body.textを配列で受け取れるようにする設定。
app.use(bodyParser.urlencoded({ extended: true }));

// /loginをGET要求されたとき。
// ログインフォームを表示します。
app.get("/login", (req, res) => {
	res
	.type("text/html")
	.send(
		`<form method="POST" action="/">
			<div>username<input type="text" name="username"></div>
			<div>password<input type="password" name="password"></div>
			<div><input type="submit" name="login"></div>
			<div>※ユーザーID:admin、パスワード:passwordでログインできる。</div>
		</form>`
	)
});

// /loginをPOST要求（ログイン画面からユーザーIDとパスワードが送付）されたとき。
// パスワードを照合し、正しければセッションを生成します。
//（当然ですが、実際に運用する時はパスワードのハッシュ化やCSRF対策などを行なってください）
app.post("/login", (req, res) => {
	const username = req.body.username
	const password = req.body.password
	if (username === "admin" && password === "password") {
		req.session.regenerate((err) => {
			req.session.username = "admin"	// ここでユーザーIDを入れる。
		})
	}
	res.redirect("/")
});

// ログアウトを要求されたとき。
// セッションを破棄し、ルート（/）にリダイレクトします。
app.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		res.redirect("/")
	})
});

// //認証が済んだら本来のアプリケーションを表示。
// app.get("/", (req, res) => {
// 	res.send(`Hello, ${req.session.username}.`);
// });

// まず、メインの処理を行う前にセッションをチェックし、セッションにユーザー名が
// 入っていなければログインページにリダイレクトをするミドルウェアを定義します。
// ※この「ミドルウェア」というのはクライアント要求を受けたあと、本来の
// 処理を実行する前に動かす前処理のことを指しているっぽい。
app.use((req, res, next) => {
	if (req.session.username) {
		// req.session.usernameに値が入っているので認証されているとみなし、本来の
		// ページ（もともとクライアントから要求されたURL）を呼び出す（next()）。
		next();
	} else {
		// req.session.usernameに値が入っているので認証されていないとみなし、
		// ログイン画面表示（GET /login）にリダイレクト。
		res.redirect("/login");
	}
})

//認証が済んだら本来のアプリケーションを表示。
app.get("/", (req, res) => {
	res.send(`Hello, ${req.session.username}.`);
});

//port3001で要求を待ち受け。http://localhost:3001/
app.listen(3001, () => {
	console.log("listening at port 3001.");
});
