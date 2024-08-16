import express from "express";
import session from "express-session";

const app = express();
const PORT = 3001;

// セッションの設定
app.use(session({
    secret: 'your_secret_key', // セッションの秘密鍵
    resave: false, // セッションが変更されていない場合でも保存するか
    saveUninitialized: true, // 初期化されていないセッションも保存するか
    cookie: { secure: false } // trueにするとHTTPSでのみクッキーが送信される
}));

// セッションにカウントを保存するルート
app.get('/', (req, res) => {
    if (req.session.views) {
        req.session.views++;
        res.send(`You have visited this page ${req.session.views} times`);
    } else {
        req.session.views = 1;
        res.send('Welcome to this page for the first time!');
    }
});

// サーバーの起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

