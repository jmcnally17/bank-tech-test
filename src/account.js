const TransactionLog = require("./transactionLog");
const Statement = require("./statement");

class Account {
  constructor(log = new TransactionLog(), statement = new Statement()) {
    this.balance = 0;
    this.log = log;
    this.statement = statement;
  }

  getBalance() {
    return this.balance;
  }

  displayBalance() {
    return `Balance: £${this.balance.toFixed(2)}`;
  }

  deposit(amount, date) {
    this.#checkErrors(amount, date);
    this.balance += amount;
    this.balance = parseFloat(this.balance.toFixed(2));
    this.log.addTransaction("deposit", amount, date, this.balance);
  }

  withdraw(amount, date) {
    this.#checkErrors(amount, date);
    this.#balanceCheck(amount);
    this.balance -= amount;
    this.balance = parseFloat(this.balance.toFixed(2));
    this.log.addTransaction("withdrawal", amount, date, this.balance);
  }

  printStatement() {
    console.log(this.statement.formatLog(this.log));
  }

  // private methods

  #checkErrors(amount, date) {
    this.#amountCheck(amount);
    this.#dateCheck(date);
  }

  #amountCheck(amount) {
    if (typeof amount != "number") {
      throw "Invalid amount given";
    } else if (amount.toFixed(2) != amount) {
      throw "Too many decimals! Smallest division is £0.01";
    }
  }

  #balanceCheck(amount) {
    if (amount > this.balance) {
      throw "Insufficient balance";
    }
  }

  #dateCheck(date) {
    const year = date.substring(6, 10);
    const month = date.substring(3, 5);
    const day = date.substring(0, 2);
    const formatDate = `${year}/${month}/${day}`;
    if (!new Date(formatDate).getTime()) {
      throw "Invalid date";
    }
  }
}

module.exports = Account;
