const TransactionLog = require("./transactionLog");
const Statement = require("./statement");

class Account {
	constructor(log = new TransactionLog(), statement = new Statement()) {
		this.balance = 0;
		this.log = log;
		this.statement = statement;
	}

	displayBalance() {
		return `Balance: £${this.balance.toFixed(2)}`;
	}

	deposit(amount, date = new Date()) {
		this.#amountCheck(amount);
		this.balance += amount;
		this.balance = parseFloat(this.balance.toFixed(2));
		this.log.addTransaction("deposit", amount, date, this.balance);
	}

	withdraw(amount, date = new Date()) {
		this.#amountCheck(amount);
		this.#balanceCheck(amount);
		this.balance -= amount;
		this.balance = parseFloat(this.balance.toFixed(2));
		this.log.addTransaction("withdrawal", amount, date, this.balance);
	}

	printStatement() {
		console.log(this.statement.formatLog(this.log));
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
		if (amount > this.balance) {
			throw "Insufficient balance";
		}
	}
}

module.exports = Account;
