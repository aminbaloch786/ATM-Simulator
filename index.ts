#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 10000; // in Dollars
let myPin = "1234"; // Change to string for password

let pinAnswer = await inquirer.prompt([
  {
    name: "pin",
    message: "Enter your pin",
    type: "password", // Use password type
    mask: "*", // Use asterisk as mask character
  },
]);

// Conditional Statement
if (pinAnswer.pin === myPin) {
  console.log(chalk.green("Correct pin code!!!"));

  let operationAns = await inquirer.prompt([
    {
      name: "operation",
      message: "Please select option: ",
      type: "list",
      choices: ["withdraw", "deposit", "check balance"],
    },
  ]);

  if (operationAns.operation === "withdraw") {
    let amountAns = await inquirer.prompt([
      {
        name: "amount",
        message: "Enter your amount",
        type: "number",
      },
    ]);

    if (amountAns.amount > myBalance) {
      console.log(chalk.red("Insufficient funds. Your balance is: $" + myBalance.toLocaleString()));
    } else {
      myBalance -= amountAns.amount;
      console.log(chalk.green("Your remaining balance is: $" + myBalance.toLocaleString()));
    }
  } else if (operationAns.operation === "deposit") {
    let depositAns = await inquirer.prompt([
      {
        name: "amount",
        message: "Enter the amount you want to deposit",
        type: "number",
      },
    ]);

    myBalance += depositAns.amount;
    console.log(chalk.green("Your new balance is: $" + myBalance.toLocaleString()));
  } else if (operationAns.operation === "check balance") {
    console.log(chalk.blue("Your balance is: $" + myBalance.toLocaleString()));
  }

  let printReceipt = await inquirer.prompt([
    {
      name: "print",
      message: "Do you want to print a receipt? (yes/no)",
      type: "list",
      choices: ["yes", "no"],
    },
  ]);

  if (printReceipt.print === "yes") {
    console.log(chalk.yellow("Printing receipt..."));
    console.log(chalk.yellow("Transaction details:"));
    console.log(chalk.yellow("Operation: " + operationAns.operation));
    console.log(chalk.yellow("Current Balance: $" + myBalance.toLocaleString()));
  } else {
    console.log(chalk.yellow("No receipt printed."));
  }
} else {
  console.log(chalk.red("Incorrect pin code"));
}