const {
  createConnection,
  executeTransactions,
} = require("../../../mysqlHelpers.js");
const transferMoney = (transferFrom, transferTo, amount) => {
  const connection = createConnection(
    "localhost",
    "hyfuser",
    "hyfpassword",
    "transactions"
  );

  const queries = [
    `
      UPDATE account
      SET balance = balance - ${amount}
      WHERE account_number = ${transferFrom}
    `,
    `UPDATE account
        SET balance = balance + ${amount}
        WHERE account_number = ${transferTo}
    `,
    `INSERT INTO account_change (account_number, amount, remark)
    VALUES
    (${transferFrom}, -${amount}, 'Transfer to account ${transferTo}'),
    (${transferTo}, ${amount}, 'Transfer from account ${transferFrom}')
    `,
  ];
  executeTransactions(connection, queries);
};

transferMoney(101, 102, 1000);
