/* eslint-disable no-undef */
const TransactionLog = require("./transactionLog");

describe(TransactionLog, () => {
  beforeEach(() => {
    log = new TransactionLog();
    mockDateOne = new Date(2022, 5, 25);
    mockDateTwo = new Date(2022, 5, 26);
  });

  it("starts with an empty array of transactions", () => {
    expect(log.getHistory()).toEqual([]);
  });

  describe("#addTransaction", () => {
    it("adds an object representing a deposit into an empty log", () => {
      log.addTransaction("deposit", 2000, mockDateOne);
      expect(log.getHistory()).toEqual([
        { type: "deposit", amount: 2000, date: mockDateOne, balance: 2000 }
      ]);
    });

    it("adds an object representing a deposit into a log which already contains a transaction", () => {
      log.addTransaction("deposit", 2000, mockDateOne);
      log.addTransaction("deposit", 1500, mockDateTwo);
      expect(log.getHistory()).toEqual([
        { type: "deposit", amount: 1500, date: mockDateTwo, balance: 3500 },
        { type: "deposit", amount: 2000, date: mockDateOne, balance: 2000 }
      ]);
    });

    it("adds an object representing a withdrawal into the log", () => {
      log.addTransaction("deposit", 2000, mockDateOne);
      log.addTransaction("withdrawal", 500, mockDateTwo);
      expect(log.getHistory()).toEqual([
        { type: "withdrawal", amount: 500, date: mockDateTwo, balance: 1500 },
        { type: "deposit", amount: 2000, date: mockDateOne, balance: 2000 }
      ]);
    });

    it("throws an error if an instance of Date is not given for the date argument", () => {
      expect(() => {
        log.addTransaction("deposit", 500, "25/05/2022");
      }).toThrowError("Invalid date entered");
    });
  });
});
