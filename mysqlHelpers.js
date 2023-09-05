const mysql = require("mysql");
const createConnection = (host, dbUser, dbPassword, database) => {
  const dbConfig = {
    host: host,
    user: dbUser,
    password: dbPassword,
    database: database,
  };

  const connection = mysql.createConnection(dbConfig);
  return connection;
};

const executeQueries = (connection, queries) => {
  connection.connect((error) => {
    if (error) {
      console.error("Error connecting to the database:", error);
      connection.end(); // Close the connection
      return;
    }
  });
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
  // close connection
  connection.end();
};
const executeTransactions = (connection, transactions) => {
  connection.connect((error) => {
    if (error) {
      console.error("Error connecting to the database:", error);
      connection.end(); // Close the connection
      return;
    }
  });
  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error connecting to the database:", error);
      connection.end(); // Close the connection
      return;
    }

    for (let transaction of transactions) {
      connection.query(transaction, (error, results) => {
        console.log(results);
        if (error) {
          connection.rollback(() => {
            console.error(`Error execution of ${transaction}`, error);
          });
        } else {
          console.log(`transaction executed: ${transaction}.`);
        }
      });
    }
  });

  connection.commit((err) => {
    if (err) {
      connection.rollback(() => {
        throw err;
      });
    }
    console.log("Transaction completed.");
    connection.end();
  });
};
module.exports = { createConnection, executeQueries, executeTransactions };
