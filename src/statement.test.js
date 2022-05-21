const Statement = require("./statement");
const TransactionLog = require("./transactionLog");

jest.mock("./transactionLog");

describe(Statement, () => {
  beforeEach(() => {
    TransactionLog.mockClear();
    mockLog = new TransactionLog();
    statement = new Statement();
  });

  it("formats data for one transaction in the log", () => {
    mockLog.getHistory.mockImplementation(() => [
      { type: "deposit", amount: 3500, date: "25/05/2022", balance: 3500 },
    ]);
    expect(statement.formatLog(mockLog)).toBe(
      "date || credit || debit || balance" +
        "\n25/05/2022 || 3500.00 || || 3500.00"
    );
  });

  it("formats data for a deposit and a withdrawal", () => {
    mockLog.getHistory.mockImplementation(() => [
      { type: "withdrawal", amount: 1250, date: "26/05/2022", balance: 2250 },
      { type: "deposit", amount: 3500, date: "25/05/2022", balance: 3500 },
    ]);

    expect(statement.formatLog(mockLog)).toBe(
      "date || credit || debit || balance" +
      "\n26/05/2022 || || 1250.00 || 2250.00" +
      "\n25/05/2022 || 3500.00 || || 3500.00"
    );
  });
});
