const { createConnection, executeQueries } = require("../../mysqlHelpers");
const connection = createConnection(
  "localhost",
  "hyfuser",
  "hyfpassword",
  "week"
);

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

executeQueries(connection, queries);
