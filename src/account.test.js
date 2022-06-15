/* eslint-disable no-undef */
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
		mockDateOne = new Date(2022, 4, 25);
		mockDateTwo = new Date(2022, 4, 26);
	});

	it("starts with a balance of 0", () => {
		expect(account.displayBalance()).toBe("Balance: £0.00");
	});

	it("has a transaction log", () => {
		expect(account.log).toEqual(mockLog);
	});

	it("has a statement", () => {
		expect(account.statement).toEqual(mockStatement);
	});

	describe("#deposit", () => {
		it("increases the balance by the given amount", () => {
			account.deposit(1500, mockDateOne);
			expect(account.displayBalance()).toBe("Balance: £1500.00");
		});

		it("calls the log to add this transaction", () => {
			mockLog.addTransaction.mockImplementation(() => true);

			account.deposit(1500, mockDateOne);
			expect(mockLog.addTransaction).toHaveBeenCalledTimes(1);
		});

		describe("throws an error when", () => {
			it("a number is not given for the amount", () => {
				expect(() => {
					account.deposit("hello", mockDateOne);
				}).toThrowError("Amount must be a number");
				expect(account.displayBalance()).toBe("Balance: £0.00");
			});

			it("0 or a negative number is given for the amount", () => {
				expect(() => {
					account.deposit(0, mockDateOne);
				}).toThrowError("Amount cannot be 0 or negative");
				expect(() => {
					account.deposit(-1000, mockDateOne);
				}).toThrowError("Amount cannot be 0 or negative");
				expect(account.displayBalance()).toBe("Balance: £0.00");
			});

			it("a number with too many decimals is given for the amount", () => {
				expect(() => {
					account.deposit(150.12345, mockDateOne);
				}).toThrowError("Too many decimals! Smallest division is £0.01");
				expect(account.displayBalance()).toBe("Balance: £0.00");
			});
		});
	});

	describe("#withdraw", () => {
		it("decreases the balance by the given amount", () => {
			account.deposit(2000, mockDateOne);
			account.withdraw(700, mockDateTwo);
			expect(account.displayBalance()).toBe("Balance: £1300.00");
		});

		it("calls the log to add this transaction", () => {
			mockLog.addTransaction.mockImplementation(() => true);
			account.deposit(3000, mockDateOne);

			account.withdraw(1500, mockDateTwo);
			expect(mockLog.addTransaction).toHaveBeenCalledTimes(2);
		});

		describe("throws an error when", () => {
			it("a number is not given for the amount", () => {
				expect(() => {
					account.withdraw("hello", mockDateOne);
				}).toThrowError("Amount must be a number");
				expect(account.displayBalance()).toBe("Balance: £0.00");
			});

			it("0 or a negative number is given for the amount", () => {
				account.deposit(1000, mockDateOne);
				expect(() => {
					account.withdraw(0, mockDateTwo);
				}).toThrowError("Amount cannot be 0 or negative");
				expect(() => {
					account.withdraw(-1000, mockDateTwo);
				}).toThrowError("Amount cannot be 0 or negative");
				expect(account.displayBalance()).toBe("Balance: £1000.00");
			});

			it("a number with too many decimals is given for the amount", () => {
				account.deposit(1000, mockDateOne);
				expect(() => {
					account.withdraw(150.12345, mockDateTwo);
				}).toThrowError("Too many decimals! Smallest division is £0.01");
				expect(account.displayBalance()).toBe("Balance: £1000.00");
			});

			it("the user tries to withdraw an amount greater than the balance", () => {
				expect(() => {
					account.withdraw(5, mockDateOne);
				}).toThrowError("Insufficient balance");
				expect(account.displayBalance()).toBe("Balance: £0.00");
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
			expect(mockStatement.formatLog).toHaveBeenCalledTimes(1);
			expect(logSpy).toHaveBeenCalledWith(
				"date || credit || debit || balance" +
          "\n26/05/2022 || || 1250.00 || 2250.00" +
          "\n25/05/2022 || 3500.00 || || 3500.00"
			);
		});
	});
});
