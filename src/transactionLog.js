class TransactionLog {
	constructor() {
		this.history = [];
	}

	getHistory() {
		return this.history;
	}

	addTransaction(type, amount, date, balance) {
		this.#dateCheck(date);
		const transaction = {
			type: type,
			amount: amount,
			date: date,
			balance: balance,
		};
		this.history.unshift(transaction);
	}

	// private methods

	#dateCheck(date) {
		this.#dateFormatCheck(date);
		this.#dateNumbersCheck(date);
	}

	#dateFormatCheck(date) {
		if (date.charAt(2) != "/" || date.charAt(5) != "/") {
			throw "Invalid date format: must be given as DD/MM/YYYY";
		}
	}

	#dateNumbersCheck(date) {
		const year = date.substring(6, 10);
		const month = date.substring(3, 5);
		const day = date.substring(0, 2);
		const formatDate = `${year}/${month}/${day}`;
		if (!new Date(formatDate).getTime()) {
			throw "Invalid date";
		}
	}
}

module.exports = TransactionLog;
