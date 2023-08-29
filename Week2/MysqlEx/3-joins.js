const mysql = require("mysql");

const dbConfig = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2",
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
  connection.query("USE week2", (error) => {
    if (error) {
      console.error("Error using database:", error);
    } else {
      console.log("Using w2 database.");
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
        SELECT
    A1.author_name AS author,
    A2.author_name AS mentor
    FROM
    authors A1
    LEFT JOIN
    authors A2 ON A1.mentor = A2.author_id;
        `,
  `
        SELECT
    A.*,
    RP.paper_title
    FROM
    authors A
    LEFT JOIN
    AuthorResearchPapers ARP ON A.author_id = ARP.author_id
    LEFT JOIN
    research_Papers RP ON ARP.paper_id = RP.paper_id;

        `,
];
