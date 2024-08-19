/**
 * 値をSQL用のクォーテーション（シングルクォーテーション）でくくる。
 * @param {*} val クォートする値
 * @param {*} noQuote noQuoteがtrueの場合はクォートしない
 * @returns 
 */
export const quote = (val, noQuote) => {
	let result = null;
	if (val) {
		if (noQuote) {
			result = val;
		} else {
			result = `'${val}'`;
		}
	} else {
		result = null;
	}
	return result;
};

/**
 * 値をSQL用のクォーテーション（ダブルクォーテーション）でくくる。
 * @param {*} val クォートする値
 * @param {*} noQuote noQuoteがtrueの場合はクォートしない
 * @returns 
 */
export const dquote = (val, noQuote) => {
	let result = null;
	if (val) {
		if (noQuote) {
			result = val;
		} else {
			result = `"${val}"`;
		}
	} else {
		result = null;
	}
	return result;
};

/**
 * val1がnullかundefinedの時、val2を返す。そうでない時はval1を返す。
 * @param {*} val1 
 * @param {*} val2 
 * @returns 
 */
export const isNull = (val1, val2) => {
	let result = null;
	if (!val1 || val1 === null) {
		result = val2;
	} else {
		result = val1;
	}
	return result;
};

/**
 * デバッグ出力用 (key value)形式の文字列を作成する。
 * @param {*} key 
 * @param {*} value 
 * @returns 
 */
export const pr = (key, value) => {
	let result = "(";
	if (!key) {
		result += "(undefined)";
	} else if (key === null) {
		result += "(null)";
	} else {
		result += key;
	}
	result += " ";
	if (!key) {
		result += "(undefined)";
	} else if (value === null) {
		result += "(null)";
	} else {
		result += value;
	}
	result += ")";
	return result;
};

/**
 * カンマ区切りの文字列を受け取り、各要素をquoteで加工する
 * @param {string} str カンマ区切りの文字列
 * @returns {string} 加工後の文字列
 */
export const commaStrQuote = (str) => {
	return str.split(",").map((el) => {
		return quote(el);
	})
		.join(",");
};

export const escapeSingleQuote = (str) => {
	let result = null;
	if (str) {
		if (str.indexOf("'") === -1) {
			result = str;
		} else {
			result = str.replaceAll("'", "''");
		}
	} else {
		result = null;
	}
	return result;
};
