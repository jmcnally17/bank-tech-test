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
    this.balance += amount;
  }
}

module.exports = Account;
