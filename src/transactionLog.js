class TransactionLog {
  constructor() {
    this.log = [];
  }

  getLog() {
    return this.log;
  }

  addTransaction(type, amount, date, balance) {
    const transaction = {
      type: type,
      amount: amount,
      date: date,
      balance: balance,
    };
    this.log.push(transaction);
  }
}

module.exports = TransactionLog;
