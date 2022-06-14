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
			log.addTransaction("deposit", 2000, "25/06/2022", 3500);
			expect(log.getHistory()).toEqual([
				{
					type: "deposit",
					amount: 2000,
					date: "25/06/2022",
					balance: 3500,
				},
			]);
		});

		describe("throws an error", () => {
			it("for an invalid date", () => {
				expect(() => {
					log.addTransaction("deposit", 150, "35/05/2022", 150);
				}).toThrowError("Invalid date");
				expect(log.getHistory()).toEqual([]);
			});

			it("when an invalid date format is given", () => {
				expect(() => {
					log.addTransaction("deposit", 1000, "25-05-2022", 1000);
				}).toThrowError("Invalid date format: must be given as DD/MM/YYYY");
				expect(log.getHistory()).toEqual([]);
			});
		});
	});
});
