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
    }
    this.balance += amount;
    this.log.addTransaction("deposit", amount, date, this.balance);
  }

  withdraw(amount, date) {
    if (typeof amount != "number") {
      throw "Invalid input given";
    } else if (amount.toFixed(2) != amount) {
      throw "Too many decimals! Smallest division is £0.01";
    }
    this.balance -= amount;
    this.log.addTransaction("withdrawal", amount, date, this.balance);
  }
}

module.exports = Account;
