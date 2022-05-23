const Account = require("./account");
const TransactionLog = require("./transactionLog");
const Statement = require("./statement");

jest.mock("./transactionLog");
jest.mock("./statement");

describe(Account, () => {
  beforeEach(() => {
    TransactionLog.mockClear();
    mockLog = new TransactionLog();
    mockStatement = new Statement();
    account = new Account(mockLog, mockStatement);
  });

  it("starts with a balance of 0", () => {
    expect(account.getBalance()).toBe(0);
  });

  it("has a transaction log", () => {
    expect(account.log).toEqual(mockLog);
  });

  it("has a statement", () => {
    expect(account.statement).toEqual(mockStatement);
  });

  it("can display the balance in the correct format", () => {
    const logSpy = jest.spyOn(console, "log");
    account.displayBalance();
    expect(logSpy).toHaveBeenCalledWith("Balance: £0.00");
  });

  describe("#deposit", () => {
    it("increases the balance by the given amount", () => {
      account.deposit(1500, "25/05/2022");
      expect(account.getBalance()).toBe(1500);
    });

    it("calls the log to add this transaction", () => {
      mockLog.addTransaction.mockImplementation(() => true);

      account.deposit(1500, "25/05/2022");
      expect(mockLog.addTransaction).toHaveBeenCalledTimes(1);
    });

    describe("throws an error when", () => {
      it("a number is not given for the amount", () => {
        expect(() => {
          account.deposit("hello", "25/05/2022");
        }).toThrowError("Amount must be a number");
        expect(account.getBalance()).toBe(0);
      });

      it("0 or a negative number is given for the amount", () => {
        expect(() => {
          account.deposit(0, "26/05/2022");
        }).toThrowError("Amount cannot be 0 or negative");
        expect(() => {
          account.deposit(-1000, "25/05/2022");
        }).toThrowError("Amount cannot be 0 or negative");
        expect(account.getBalance()).toBe(0);
      });

      it("a number with too many decimals is given for the amount", () => {
        expect(() => {
          account.deposit(150.12345, "25/05/2022");
        }).toThrowError("Too many decimals! Smallest division is £0.01");
        expect(account.getBalance()).toBe(0);
      });
    });
  });

  describe("#withdraw", () => {
    it("decreases the balance by the given amount", () => {
      account.deposit(2000, "25/05/2022");
      account.withdraw(700, "25/05/2022");
      expect(account.getBalance()).toBe(1300);
    });

    it("calls the log to add this transaction", () => {
      mockLog.addTransaction.mockImplementation(() => true);
      account.deposit(3000, "24/05/2022");

      account.withdraw(1500, "25/05/2022");
      expect(mockLog.addTransaction).toHaveBeenCalledTimes(2);
    });

    describe("throws an error when", () => {
      it("a number is not given for the amount", () => {
        expect(() => {
          account.withdraw("hello", "25/05/2022");
        }).toThrowError("Amount must be a number");
        expect(account.getBalance()).toBe(0);
      });

      it("0 or a negative number is given for the amount", () => {
        account.deposit(1000, "25/05/2022");
        expect(() => {
          account.withdraw(0, "26/05/2022");
        }).toThrowError("Amount cannot be 0 or negative");
        expect(() => {
          account.withdraw(-1000, "26/05/2022");
        }).toThrowError("Amount cannot be 0 or negative");
        expect(account.getBalance()).toBe(1000);
      });

      it("a number with too many decimals is given for the amount", () => {
        account.deposit(1000, "24/05/2022");
        expect(() => {
          account.withdraw(150.12345, "25/05/2022");
        }).toThrowError("Too many decimals! Smallest division is £0.01");
        expect(account.getBalance()).toBe(1000);
      });

      it("the user tries to withdraw an amount greater than the balance", () => {
        expect(() => {
          account.withdraw(5, "25/05/2022");
        }).toThrowError("Insufficient balance");
        expect(account.getBalance()).toBe(0);
      });
    });
  });

  describe("#printStatement", () => {
    it("prints the statement to the console", () => {
      mockLog.getHistory.mockImplementation(() => [
        { type: "withdrawal", amount: 1250, date: "26/05/2022", balance: 2250 },
        { type: "deposit", amount: 3500, date: "25/05/2022", balance: 3500 },
      ]);
      mockStatement.formatLog.mockImplementation(
        () =>
          "date || credit || debit || balance" +
          "\n26/05/2022 || || 1250.00 || 2250.00" +
          "\n25/05/2022 || 3500.00 || || 3500.00"
      );
      const logSpy = jest.spyOn(console, "log");
      account.printStatement();
      expect(mockStatement.formatLog).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(
        "date || credit || debit || balance" +
          "\n26/05/2022 || || 1250.00 || 2250.00" +
          "\n25/05/2022 || 3500.00 || || 3500.00"
      );
    });
  });
});
