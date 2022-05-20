const TransactionLog = require("./transactionLog");

describe(TransactionLog, () => {
  it("starts with an empty array of transactions", () => {
    const log = new TransactionLog();
    expect(log.getLog()).toEqual([]);
  });
});
