const Account = require("./account");

describe("Account", () => {
  it("starts with a balance of 0", () => {
    const account = new Account();
    expect(account.getBalance()).toBe(0);
  });
});
