const Account = require("./account");

describe(Account, () => {
  it("can make multiple transactions", () => {
    const account = new Account();
    account.deposit(1250, "26/05/2022");
    account.withdraw(450, "27/05/2022");
    account.deposit(1000, "29/05/2022");
    const logSpy = jest.spyOn(console, "log");
    account.displayBalance();
    expect(logSpy).toHaveBeenCalledWith("Balance: £1800.00");
  });
});