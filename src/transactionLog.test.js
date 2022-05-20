const TransactionLog = require("./transactionLog");

describe(TransactionLog, () => {
  beforeEach(() => {
    log = new TransactionLog();
  });

  it("starts with an empty array of transactions", () => {
    expect(log.getLog()).toEqual([]);
  });

  describe("#addTransaction", () => {
    it("adds an object representing a transaction into the log", () => {
      log.addTransaction("deposit", 2000, "25/06/2022", 3500);
      expect(log.getLog()).toEqual([
        {
          type: "deposit",
          amount: 2000,
          date: "25/06/2022",
          balance: 3500,
        },
      ]);
    });
  });
});
