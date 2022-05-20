const Account = require("./account");
const TransactionLog = require("./transactionLog");

jest.mock("./transactionLog");

describe(Account, () => {
  beforeEach(() => {
    TransactionLog.mockClear();
    mockLog = new TransactionLog();
    account = new Account(mockLog);
  });

  it("starts with a balance of 0", () => {
    expect(account.getBalance()).toBe(0);
  });

  it("has a transaction log", () => {
    expect(account.log).toEqual(mockLog);
  });

  it("can display the balance in the correct format", () => {
    expect(account.displayBalance()).toBe("Balance: £0.00");
  });

  describe("#deposit", () => {
    it("increases the balance by the given amount", () => {
      account.deposit(1500, "25/05/2022");
      expect(account.getBalance()).toBe(1500);
      expect(account.displayBalance()).toBe("Balance: £1500.00");
    });

    it("calls the log to add this transaction", () => {
      account.log.addTransaction.mockImplementation(() => true);

      account.deposit(1500, "25/05/2022");
      expect(account.log.addTransaction).toHaveBeenCalledTimes(1);
    });

    it("throws an error when a number is not given for the amount", () => {
      expect(() => {
        account.deposit("hello");
      }).toThrowError("Invalid amount given");
      expect(account.getBalance()).toBe(0);
    });

    it("throws an error when a number with too many decimals is given for the amount", () => {
      expect(() => {
        account.deposit(150.12345, "25/05/2022");
      }).toThrowError("Too many decimals! Smallest division is £0.01");
      expect(account.getBalance()).toBe(0);
    });

    it("throws an error when an invalid date is given", () => {
      expect(() => {
        account.deposit(150, "35/05/2022");
      }).toThrowError("Invalid date");
      expect(account.getBalance()).toBe(0);
    });
  });

  describe("#withdraw", () => {
    it("decreases the balance by the given amount", () => {
      account.deposit(2000, "25/05/2022");
      account.withdraw(700, "25/05/2022");
      expect(account.getBalance()).toBe(1300);
      expect(account.displayBalance()).toBe("Balance: £1300.00");
    });

    it("calls the log to add this transaction", () => {
      account.log.addTransaction.mockImplementation(() => true);
      account.deposit(3000, "24/05/2022");

      account.withdraw(1500, "25/05/2022");
      expect(account.log.addTransaction).toHaveBeenCalledTimes(2);
    });

    it("throws an error when a number is not given for the amount", () => {
      expect(() => {
        account.withdraw("hello");
      }).toThrowError("Invalid amount given");
      expect(account.getBalance()).toBe(0);
    });

    it("throws an error when a number with too many decimals is given for the amount", () => {
      account.deposit(1000, "24/05/2022");
      expect(() => {
        account.withdraw(150.12345, "25/05/2022");
      }).toThrowError("Too many decimals! Smallest division is £0.01");
      expect(account.getBalance()).toBe(1000);
    });

    it("throws an error when an invalid date is given", () => {
      account.deposit(1000, "25/05/2022");
      expect(() => {
        account.withdraw(150, "27/14/2022");
      }).toThrowError("Invalid date");
      expect(account.getBalance()).toBe(1000);
    });

    it("throws an error if the user tries to withdraw an amount greater than the balance", () => {
      expect(() => {
        account.withdraw(5, "25/05/2022");
      }).toThrowError("Insufficient balance");
      expect(account.getBalance()).toBe(0);
    });
  });
});
