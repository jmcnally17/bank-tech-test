const TransactionLog = require("./transactionLog");
const Statement = require("./statement");

class Account {
  constructor(log = new TransactionLog(), statement = new Statement()) {
    this.balance = 0;
    this.log = log;
    this.statement = statement;
    console.log("Thank you for opening an account.");
  }

  getBalance() {
    return this.balance;
  }

  displayBalance() {
    console.log(`Balance: £${this.balance.toFixed(2)}`);
  }

  deposit(amount, date) {
    this.#amountCheck(amount);
    this.balance += amount;
    this.balance = parseFloat(this.balance.toFixed(2));
    this.log.addTransaction("deposit", amount, date, this.balance);
    console.log(
      `You have deposited £${amount.toFixed(2)}` +
        `\nNew balance: £${this.balance.toFixed(2)}`
    );
  }

  withdraw(amount, date) {
    this.#amountCheck(amount);
    this.#balanceCheck(amount);
    this.balance -= amount;
    this.balance = parseFloat(this.balance.toFixed(2));
    this.log.addTransaction("withdrawal", amount, date, this.balance);
    console.log(
      `You have withdrawn £${amount.toFixed(2)}` +
        `\nNew balance: £${this.balance.toFixed(2)}`
    );
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
