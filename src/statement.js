class Statement {
  formatLog(log) {
    let statement = "date || credit || debit || balance";
    log.getHistory().forEach((transaction) => {
      if (transaction.type === "deposit") {
        const newLine =
          `\n${transaction.date} || ` +
          `${transaction.amount.toFixed(2)} || || ` +
          `${transaction.balance.toFixed(2)}`;
        statement += newLine;
      } else {
        const newLine =
          `\n${transaction.date} || || ` +
          `${transaction.amount.toFixed(2)} || ` +
          `${transaction.balance.toFixed(2)}`;
        statement += newLine;
      }
    });
    return statement;
  }
}

module.exports = Statement;
