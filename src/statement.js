class Statement {
  formatLog(log) {
    let statement = "date || credit || debit || balance";
    log.forEach((transaction) => {
      statement += this.#formatTransaction(transaction);
    });
    return statement;
  }

  // private

  #formatTransaction(transaction) {
    if (transaction.type === "deposit") {
      return this.#formatDeposit(transaction);
    } else {
      return this.#formatWithdrawal(transaction);
    }
  }

  #formatDeposit(transaction) {
    const newLine =
      `\n${transaction.date.toLocaleDateString()} || ` +
      `${transaction.amount.toFixed(2)} || || ` +
      `${transaction.balance.toFixed(2)}`;
    return newLine;
  }

  #formatWithdrawal(transaction) {
    const newLine =
      `\n${transaction.date.toLocaleDateString()} || || ` +
      `${transaction.amount.toFixed(2)} || ` +
      `${transaction.balance.toFixed(2)}`;
    return newLine;
  }
}

module.exports = Statement;
