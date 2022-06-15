class TransactionLog {
	constructor() {
		this.history = [];
	}

	getHistory() {
		return this.history;
	}

	addTransaction(type, amount, date) {
		const newBalance = this.#newBalanceCalculator(type, amount);
		const transaction = {
			type: type,
			amount: amount,
			date: date,
			balance: newBalance,
		};
		this.history.unshift(transaction);
	}

	// private methods

	#newBalanceCalculator(type, amount) {
		if (this.history.length === 0) return amount;
		else if (type === "deposit") return this.history[0].balance + amount;
		return this.history[0].balance - amount;
	}
}

module.exports = TransactionLog;
