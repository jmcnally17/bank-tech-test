const TransactionLog = require("./transactionLog");

class Account {
  constructor(log = new TransactionLog()) {
    this.balance = 0;
    this.log = log;
  }

  getBalance() {
    return this.balance;
  }

  displayBalance() {
    return `Balance: £${this.balance.toFixed(2)}`;
  }

  deposit(amount, date) {
    if (typeof amount != "number") {
      throw "Invalid input given";
    } else if (amount.toFixed(2) != amount) {
      throw "Too many decimals! Smallest division is £0.01";
    } else if (!this.#dateCheck(date)) {
      throw "Invalid date";
    }
    this.balance += amount;
    this.log.addTransaction("deposit", amount, date, this.balance);
  }

  withdraw(amount, date) {
    if (typeof amount != "number") {
      throw "Invalid input given";
    } else if (amount.toFixed(2) != amount) {
      throw "Too many decimals! Smallest division is £0.01";
    } else if (!this.#dateCheck(date)) {
      throw "Invalid date";
    }
    this.balance -= amount;
    this.log.addTransaction("withdrawal", amount, date, this.balance);
  }

  // private methods

  #dateCheck(date) {
    const year = date.substring(6, 10);
    const month = date.substring(3, 5);
    const day = date.substring(0, 2);
    const formatDate = `${year}/${month}/${day}`;
    return (new Date(formatDate)).getTime()
  }
}

module.exports = Account;
