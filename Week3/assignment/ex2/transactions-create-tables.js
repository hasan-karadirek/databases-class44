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
  `CREATE TABLE Account(
        account_number INT AUTO_INCREMENT PRIMARY KEY,
        balance DECIMAL(10, 2) NOT NULL
    );`,
  `CREATE TABLE Account_change(
    change_number INT AUTO_INCREMENT PRIMARY KEY,
    account_number INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remark TEXT,
    FOREIGN KEY (account_number) REFERENCES Account(account_number)
);
`,
];

executeQueries(connection, queries);
