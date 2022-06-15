const TransactionLog = require("./transactionLog");
const Statement = require("./statement");

class Account {
	constructor(log = new TransactionLog(), statement = new Statement()) {
		this.log = log;
		this.statement = statement;
	}

	displayBalance() {
		if (this.log.getHistory().length === 0) {
			return "Balance: £0.00";
		} else {
			const balance = this.log.getHistory()[0].balance;
			return `Balance: £${balance.toFixed(2)}`;
		}
	}

	deposit(amount, date = new Date()) {
		this.#amountCheck(amount);
		this.balance += amount;
		this.balance = parseFloat(this.balance.toFixed(2));
		this.log.addTransaction("deposit", amount, date);
	}

	withdraw(amount, date = new Date()) {
		this.#amountCheck(amount);
		this.#balanceCheck(amount);
		this.balance -= amount;
		this.balance = parseFloat(this.balance.toFixed(2));
		this.log.addTransaction("withdrawal", amount, date);
	}

	printStatement() {
		const statementString = this.statement.formatLog(this.log.getHistory());
		console.log(statementString);
	}

	// private methods

	#amountCheck(amount) {
		if (typeof amount != "number") {
			throw "Amount must be a number";
		} else if (amount <= 0) {
			throw "Amount cannot be 0 or negative";
		} else if (amount.toFixed(2) != amount) {
			throw "Too many decimals! Smallest division is £0.01";
		}
	}

	#balanceCheck(amount) {
		if (
			this.log.getHistory().length === 0
			|| amount > this.log.getHistory()[0].balance
		) {
			throw "Insufficient balance";
		}
	}
}

module.exports = Account;
