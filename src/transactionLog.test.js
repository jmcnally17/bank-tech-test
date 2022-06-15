/* eslint-disable no-undef */
const TransactionLog = require("./transactionLog");

describe(TransactionLog, () => {
	beforeEach(() => {
		log = new TransactionLog();
	});

	it("starts with an empty array of transactions", () => {
		expect(log.getHistory()).toEqual([]);
	});

	describe("#addTransaction", () => {
		it("adds an object representing a transaction into the log", () => {
			const mockDate = new Date(2022, 5, 25);
			log.addTransaction("deposit", 2000, mockDate, 3500);
			expect(log.getHistory()).toEqual([
				{
					type: "deposit",
					amount: 2000,
					date: mockDate,
					balance: 3500,
				},
			]);
		});
	});
});
