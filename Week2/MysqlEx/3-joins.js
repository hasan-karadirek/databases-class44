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

executeQueries(connection, queries);
