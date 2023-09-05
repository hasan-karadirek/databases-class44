const {
  createConnection,
  executeQueries,
} = require("../../../mysqlHelpers.js");
const connection = createConnection(
  "localhost",
  "hyfuser",
  "hyfpassword",
  "transactions"
);

const queries = [
  `INSERT INTO account (account_number, balance) VALUES
    (101, 5000.00),
    (102, 7500.00),
    (103, 3000.00);`,
  `INSERT INTO account_change (account_number, amount, changed_date, remark) VALUES
    (101, -500.00, '2023-09-05', 'Withdrawal - Grocery shopping'),
    (102, 1000.00, '2023-09-06', 'Deposit - Salary'),
    (103, -200.00, '2023-09-07', 'Withdrawal - Rent'),
    (101, 200.00, '2023-09-08', 'Deposit - Refund'),
    (102, -300.00, '2023-09-09', 'Withdrawal - Dining out');`,
];

executeQueries(connection, queries);
