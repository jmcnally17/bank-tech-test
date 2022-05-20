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
    it("increase the balance by the given amount", () => {
      account.deposit(1500);
      expect(account.getBalance()).toBe(1500);
      expect(account.displayBalance()).toBe("Balance: £1500.00");
    });
  });
});
