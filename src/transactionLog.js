class TransactionLog {
	constructor() {
		this.history = [];
	}

	getHistory() {
		return this.history;
	}

	addTransaction(type, amount, date, balance) {
		const transaction = {
			type: type,
			amount: amount,
			date: date,
			balance: balance,
		};
		this.history.unshift(transaction);
	}
}

module.exports = TransactionLog;
