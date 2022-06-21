/* eslint-disable no-undef */
const Account = require("./account");

describe(Account, () => {
  it("can make multiple transactions", () => {
    const today = new Date().toLocaleDateString();
    const account = new Account();
    account.deposit(1250);
    account.withdraw(450);
    account.deposit(1000);
    expect(account.displayBalance()).toBe("Balance: £1800.00");
    const logSpy = jest.spyOn(console, "log");
    account.printStatement();
    expect(logSpy).toHaveBeenCalledWith(
      "date || credit || debit || balance"
			+ `\n${today} || 1000.00 || || 1800.00`
			+ `\n${today} || || 450.00 || 800.00`
			+ `\n${today} || 1250.00 || || 1250.00`
    );
  });
});