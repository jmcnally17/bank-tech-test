const Account = require("./account");

describe(Account, () => {
  beforeEach(() => {
    account = new Account();
  });

  it("starts with a balance of 0", () => {
    expect(account.getBalance()).toBe(0);
  });

  it("can display the balance in the correct format", () => {
    expect(account.displayBalance()).toBe("Balance: £0.00");
  });

  describe("#deposit", () => {
    it("increases the balance by the given amount", () => {
      account.deposit(1500);
      expect(account.getBalance()).toBe(1500);
      expect(account.displayBalance()).toBe("Balance: £1500.00");
    });

    it("throws an error when a number is not given", () => {
      expect(() => {
        account.deposit("hello");
      }).toThrowError("Invalid input given");
      expect(account.getBalance()).toBe(0);
    });
  });

  describe("#withdraw", () => {
    it("decreases the balance by the given amount", () => {
      account.deposit(2000);
      account.withdraw(700);
      expect(account.getBalance()).toBe(1300);
      expect(account.displayBalance()).toBe("Balance: £1300.00");
    });

    it("throws an error when a number is not given", () => {
      expect(() => {
        account.withdraw("hello");
      }).toThrowError("Invalid input given");
      expect(account.getBalance()).toBe(0);
    });
  });
});
