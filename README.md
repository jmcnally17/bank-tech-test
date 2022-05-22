# Bank Tech Test

This is a tech test for the Makers main course written in Javascript which simulates a bank account that has a balance, can deposit money, can withdraw money and print its statement. This program has been made while adhering to the following principles:
  * OOP (Object Oriented Programming)
  * TDD (Test Driven Development)
  * Single Responsibility Principle
  * DRY (Don't Repeat Yourself) code

Technologies used:
  * [Miro](https://miro.com/) for planning. Board can be found [here](https://miro.com/app/board/uXjVOzM9MG8=/?share_link_id=305314712727)
  * [Jest](https://jestjs.io/) for unit testing.
  * The VS Code extension [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for linting.

## Getting Started

This program is run using Node.js, which is installed using NVM - Node Version Manager. So, if you haven't already, install NVM using:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Now, your ~/.zshrc file will need reloading:

```
source ~/.zshrc
```

Next, you can install and start using node by running:

```
nvm install node
nvm use node
```

`nvm use node` will use the latest stable version. Once that is set up, you can now clone this repository and then install the necessary dependencies using:

```
git clone https://github.com/jmcnally17/bank-tech-test.git
npm install
```

`npm install` must be run while in the main directory.

Now you are all set up. Move onto the following section to learn how to use this program.

## How To Use

While in the [main](https://github.com/jmcnally17/bank-tech-test) directory, change to the [src](https://github.com/jmcnally17/bank-tech-test/tree/main/src) directory using `cd src` and then run the [account.js](https://github.com/jmcnally17/bank-tech-test/blob/main/src/account.js) file in Node.js REPL:

```
node
.load account.js
```

The terminal being in the src directory is necessary so that the require statements in account.js for both the [TransactionLog](https://github.com/jmcnally17/bank-tech-test/blob/main/src/transactionLog.js) and [Statement](https://github.com/jmcnally17/bank-tech-test/blob/main/src/statement.js) classes work correctly.

Once the file has loaded, a new account can be created and updated with the following commands:

```
const account = new Account();
account.deposit(amount, date);
account.withdraw(amount, date);
```

The deposit and withdraw functions increase and decrease the balance of the account respectively and are added into the history of the transaction log. These functions both have the following requirements for their arguments passed:

* amount:
  * must be a number
  * cannot be less than or equal to 0
  * cannot have more than two decimal places (since it is in units of pounds)
  * cannot be greater than the balance (this only applies to withdraw)
* date:
  * must be in a valid format (DD/MM/YYYY)
  * must be a valid date

If any of these conditions are not met, then the program will throw an appropriate error, giving the user some insight into what was wrong with their input.

At any point, the accounts balance and statement can be printed to the console using:

```
account.displayBalance();
account.printStatement();
```

This will display the balance in a simple readable print:

```
Balance: £2500.00
```

The statement will show every transaction from most recent to oldest in the format:

```
date || credit || debit || balance
14/01/2023 || || 500.00 || 2500.00
13/01/2023 || 2000.00 || || 3000.00
10/01/2023 || 1000.00 || || 1000.00
```

Transactions with a non-zero amount of money in the credit column are deposits while transactions with a non zero amount of money in the debit column are withdrawals. The balance displayed is the balance of the account once the transaction has been completed.

The user is able to enter dates they want in any order. This could therefore create confusion in the statement with transactions being unordered. In the real world, the program would simply record the current date when a transaction is made (could be done by simply using `new Date()`). However, this program has been designed with the intent for the user to use this on a short timescale. Therefore, forcing the user to use the current date would mean they could only record transactions one day at a time which would be a major inconvenience for testing this program.

### Example Output

![Example output in Node](images/example_output.png "Example output in Node.js REPL")

## Testing

Jest was used to create the test suite for each class. To run the tests, simply enter `jest` into the terminal while in either the main or src directory. If you want to see the code coverage stats as well, then running `jest --coverage` will show them. Each test passes and provides a 100% code coverage with regards to each function and each line. The output from this is shown here:

![Code coverage from Jest](image/code_coverage.png "Code coverage from Jest")

Tests were alway written first using the Red-Green-Refactor technique from TDD, with the simplest implementation to solve the tests being written first. Any code that needed to be changed was done so after its test had been updated first. This is so even when modifications are made to existing code, the Red-Green-Refactor technique is still followed.
