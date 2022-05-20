class Account {
  constructor() {
    this.balance = 0;
  }

  getBalance() {
    return this.balance;
  }

  displayBalance() {
    return `Balance: £${this.balance.toFixed(2)}`;
  }

  deposit(amount) {
    if (typeof amount != "number") throw "Invalid input given";
    this.balance += amount;
  }

  withdraw(amount) {
    if (typeof amount != "number") throw "Invalid input given";
    this.balance -= amount;
  }
}

module.exports = Account;
