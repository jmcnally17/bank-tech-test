/* eslint-disable no-undef */
const Account = require("./account");

describe(Account, () => {
	it("can make multiple transactions", () => {
		const mockDateOne = new Date(2022, 4, 26);
		const mockDateTwo = new Date(2022, 4, 27);
		const mockDateThree = new Date(2022, 4, 29);
		const account = new Account();
		account.deposit(1250, mockDateOne);
		account.withdraw(450, mockDateTwo);
		account.deposit(1000, mockDateThree);
		expect(account.displayBalance()).toBe("Balance: £1800.00");
		const logSpy = jest.spyOn(console, "log");
		account.printStatement();
		expect(logSpy).toHaveBeenCalledWith(
			"date || credit || debit || balance"
			+ "\n29/05/2022 || 1000.00 || || 1800.00"
			+ "\n27/05/2022 || || 450.00 || 800.00"
			+ "\n26/05/2022 || 1250.00 || || 1250.00"
		);
	});
});