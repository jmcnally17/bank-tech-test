/* eslint-disable no-undef */
const Account = require("./account");
const TransactionLog = require("./transactionLog");
const Statement = require("./statement");

jest.mock("./transactionLog");
jest.mock("./statement");

describe(Account, () => {
  beforeEach(() => {
    TransactionLog.mockClear();
    Statement.mockClear();
    mockLog = new TransactionLog();
    mockStatement = new Statement();
    account = new Account(mockLog, mockStatement);
    mockDateOne = new Date(2022, 4, 25);
    mockDateTwo = new Date(2022, 4, 26);
  });

  it("has a transaction log", () => {
    expect(account.log).toEqual(mockLog);
  });

  it("has a statement", () => {
    expect(account.statement).toEqual(mockStatement);
  });

  it("starts with a balance of 0", () => {
    mockLog.getHistory.mockImplementation(() => []);
    expect(account.displayBalance()).toBe("Balance: £0.00");
    expect(mockLog.getHistory).toHaveBeenCalledTimes(1);
  });

  it("displays the updated balance of the last transaction made", () => {
    mockLog.getHistory.mockImplementation(() => [
      { type: "withdrawal", amount: 1250, date: mockDateTwo, balance: 2250 },
      { type: "deposit", amount: 3500, date: mockDateOne, balance: 3500 },
    ]);
    expect(account.displayBalance()).toBe("Balance: £2250.00");
    expect(mockLog.getHistory).toHaveBeenCalledTimes(2);
  });

  describe("#deposit", () => {
    it("sends through a deposit transaction", () => {
      mockLog.addTransaction.mockImplementation(() => true);
      expect(account.deposit(1500, mockDateOne)).toBe("You have deposited £1500.00");
      expect(mockLog.addTransaction).toHaveBeenCalledWith("deposit", 1500, mockDateOne);
    });

    describe("throws an error when", () => {
      it("a number is not given for the amount", () => {
        mockLog.addTransaction.mockImplementation(() => true);
        expect(() => {
          account.deposit("hello", mockDateOne);
        }).toThrowError("Amount must be a number");
        expect(mockLog.addTransaction).toHaveBeenCalledTimes(0);
      });

      it("0 or a negative number is given for the amount", () => {
        mockLog.addTransaction.mockImplementation(() => true);
        expect(() => {
          account.deposit(0, mockDateOne);
        }).toThrowError("Amount cannot be 0 or negative");
        expect(() => {
          account.deposit(-1000, mockDateOne);
        }).toThrowError("Amount cannot be 0 or negative");
        expect(mockLog.addTransaction).toHaveBeenCalledTimes(0);
      });

      it("a number with too many decimals is given for the amount", () => {
        mockLog.addTransaction.mockImplementation(() => true);
        expect(() => {
          account.deposit(150.12345, mockDateOne);
        }).toThrowError("Too many decimals! Smallest division is £0.01");
        expect(mockLog.addTransaction).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe("#withdraw", () => {
    it("adds a deposit transaction to the log", () => {
      mockLog.getHistory.mockImplementation(() => [
        { type: "deposit", amount: 2000, date: mockDateOne, balance: 2000}
      ]);
      mockLog.addTransaction.mockImplementation(() => true);
      expect(account.withdraw(700, mockDateTwo)).toBe("You have withdrawan £700.00");
      expect(mockLog.addTransaction).toHaveBeenCalledWith("withdrawal", 700, mockDateTwo);
    });

    describe("throws an error when", () => {
      it("a number is not given for the amount", () => {
        mockLog.addTransaction.mockImplementation(() => true);
        expect(() => {
          account.withdraw("hello", mockDateOne);
        }).toThrowError("Amount must be a number");
        expect(mockLog.addTransaction).toHaveBeenCalledTimes(0);
      });

      it("0 or a negative number is given for the amount", () => {
        mockLog.addTransaction.mockImplementation(() => true);
        expect(() => {
          account.withdraw(0, mockDateOne);
        }).toThrowError("Amount cannot be 0 or negative");
        expect(() => {
          account.withdraw(-1000, mockDateOne);
        }).toThrowError("Amount cannot be 0 or negative");
        expect(mockLog.addTransaction).toHaveBeenCalledTimes(0);
      });

      it("a number with too many decimals is given for the amount", () => {
        mockLog.addTransaction.mockImplementation(() => true);
        expect(() => {
          account.withdraw(150.12345, mockDateOne);
        }).toThrowError("Too many decimals! Smallest division is £0.01");
        expect(mockLog.addTransaction).toHaveBeenCalledTimes(0);
      });

      it("the user tries to withdraw money from an account with no previous transactions", () => {
        mockLog.getHistory.mockImplementation(() => []);
        mockLog.addTransaction.mockImplementation(() => true);
        expect(() => {
          account.withdraw(5, mockDateOne);
        }).toThrowError("Insufficient balance");
        expect(mockLog.addTransaction).toHaveBeenCalledTimes(0);
      });

      it("the user tries to withdraw an amount greater than the balance", () => {
        mockLog.getHistory.mockImplementation(() => [
          { type: "deposit", amount: 500, date: mockDateOne, balance: 500 }
        ]);
        mockLog.addTransaction.mockImplementation(() => true);
        expect(() => {
          account.withdraw(750, mockDateTwo);
        }).toThrowError("Insufficient balance");
        expect(mockLog.addTransaction).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe("#printStatement", () => {
    it("prints the statement to the console", () => {
      mockLog.getHistory.mockImplementation(() => [
        { type: "withdrawal", amount: 1250, date: mockDateTwo, balance: 2250 },
        { type: "deposit", amount: 3500, date: mockDateOne, balance: 3500 },
      ]);
      mockStatement.formatLog.mockImplementation(
        () =>
          "date || credit || debit || balance" +
          "\n26/05/2022 || || 1250.00 || 2250.00" +
          "\n25/05/2022 || 3500.00 || || 3500.00"
      );
      const logSpy = jest.spyOn(console, "log");
      account.printStatement();
      expect(mockStatement.formatLog).toHaveBeenCalledWith(mockLog.getHistory());
      expect(logSpy).toHaveBeenCalledWith(mockStatement.formatLog());
    });
  });
});
