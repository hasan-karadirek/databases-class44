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
  RP.paper_title,
  COUNT(ARP.author_id) AS num_authors
FROM
  research_Papers RP
LEFT JOIN
  AuthorResearchPapers ARP ON RP.paper_id = ARP.paper_id
GROUP BY
  RP.paper_title;

    `,
  `
        SELECT
    SUM(CASE WHEN A.gender = 'Female' THEN 1 ELSE 0 END) AS total_female_papers
    FROM
    authors A
    JOIN
    AuthorResearchPapers ARP ON A.author_id = ARP.author_id;
    `,
  `
    SELECT
  university,
  AVG(h_index) AS avg_h_index
FROM
  authors
GROUP BY
  university;
    `,
  `
    SELECT
  university,
  COUNT(ARP.author_id) AS total_papers
FROM
  authors A
LEFT JOIN
  AuthorResearchPapers ARP ON A.author_id = ARP.author_id
GROUP BY
  university;
  `,
  `
  SELECT
  university,
  MIN(h_index) AS min_h_index,
  MAX(h_index) AS max_h_index
FROM
  authors
GROUP BY
  university;
  `,
];
