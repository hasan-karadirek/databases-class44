const mysql = require("mysql");

const dbConfig = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
};

const connection = mysql.createConnection(dbConfig);

// Connect to the MySQL server
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    connection.end(); // Close the connection
    return;
  }

  useDatabase();
  // execute queries
  executeQueries(queries);
  // close connection
  connection.end();
});

const useDatabase = () => {
  connection.query("USE new_world", (error) => {
    if (error) {
      console.error("Error using database:", error);
    } else {
      console.log("Using meetup database.");
    }
  });
};

const executeQueries = (queries) => {
  for (let query of queries) {
    connection.query(query, (error, results) => {
      console.log(results);
      if (error) {
        console.log(`Error execution of ${query}`, error);
      } else {
        console.log(`query executed: ${query}.`);
      }
    });
  }
};

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
