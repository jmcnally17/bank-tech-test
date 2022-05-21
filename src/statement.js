class Statement {
  formatLog(log) {
    let statement = "date || credit || debit || balance";
    const transaction =
      `\n${log.getHistory()[0].date} || ` +
      `${log.getHistory()[0].amount.toFixed(2)} || || ` +
      `${log.getHistory()[0].balance.toFixed(2)}`;
    return statement + transaction;
  }
}

module.exports = Statement;
