const { createConnection, executeQueries } = require("../../mysqlHelpers");

const connection = createConnection(
  "localhost",
  "hyfuser",
  "hyfpassword",
  "new_world"
);

const queries = [
  `
  CREATE TABLE authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL,
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('Male', 'Female', 'Other')
  );
  `,
  `ALTER TABLE authors
  ADD COLUMN mentor INT;
  `,
  `ALTER TABLE authors
  ADD FOREIGN KEY (mentor) 
  REFERENCES authors(author_id);
  `,
];

executeQueries(connection, queries);
