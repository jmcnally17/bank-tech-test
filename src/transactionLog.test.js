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
			log.addTransaction("deposit", 2000, mockDate);
			expect(log.getHistory()).toEqual([
				{
					type: "deposit",
					amount: 2000,
					date: mockDate,
					balance: 2000,
				},
			]);
		});

		it("throws an error if an instance of Date is not given for the date argument", () => {
			expect(() => {
				log.addTransaction("deposit", 500, "25/05/2022");
			}).toThrowError("Invalid date entered");
		});
	});
});
