const { createConnection, executeQueries } = require("../../mysqlHelpers");

const connection = createConnection(
  "localhost",
  "hyfuser",
  "hyfpassword",
  "week2"
);

const queries = [
  `
    CREATE TABLE research_Papers (
        paper_id INT AUTO_INCREMENT PRIMARY KEY,
        paper_title VARCHAR(255) NOT NULL,
        conference VARCHAR(255),
        publish_date DATE
      );
      
    `,
  `
    CREATE TABLE AuthorResearchPapers (
        author_id INT,
        paper_id INT,
        PRIMARY KEY (author_id, paper_id),
        FOREIGN KEY (author_id) REFERENCES Authors(author_id),
        FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)
    );
  
    `,
  `
    INSERT INTO research_Papers (paper_title, conference, publish_date)
VALUES
  ('Paper 1', 'Conference X', '2022-01-15'),
  ('Paper 2', 'Conference Y', '2021-05-20'),
  ('Paper 3', 'Conference Z', '2023-03-10'),
  ('Paper 4', 'Conference A', '2022-08-05'),
  ('Paper 5', 'Conference B', '2020-11-28'),
  ('Paper 6', 'Conference C', '2021-09-12'),
  ('Paper 7', 'Conference Y', '2023-01-05'),
  ('Paper 8', 'Conference Z', '2020-06-30'),
  ('Paper 9', 'Conference X', '2022-04-22'),
  ('Paper 10', 'Conference A', '2021-10-18'),
  ('Paper 11', 'Conference B', '2023-03-08'),
  ('Paper 12', 'Conference C', '2020-12-15'),
  ('Paper 13', 'Conference X', '2021-07-01'),
  ('Paper 14', 'Conference Y', '2022-02-28'),
  ('Paper 15', 'Conference Z', '2023-11-10'),
  ('Paper 16', 'Conference A', '2020-08-05'),
  ('Paper 17', 'Conference B', '2022-04-18'),
  ('Paper 18', 'Conference C', '2021-03-22'),
  ('Paper 19', 'Conference Z', '2022-07-12'),
  ('Paper 20', 'Conference X', '2023-06-15'),
  ('Paper 21', 'Conference Y', '2021-02-09'),
  ('Paper 22', 'Conference A', '2020-11-01'),
  ('Paper 23', 'Conference B', '2022-09-08'),
  ('Paper 24', 'Conference C', '2021-04-17'),
  ('Paper 25', 'Conference X', '2023-10-30'),
  ('Paper 26', 'Conference Y', '2022-06-24'),
  ('Paper 27', 'Conference Z', '2021-09-05'),
  ('Paper 28', 'Conference A', '2020-12-18'),
  ('Paper 29', 'Conference B', '2022-03-12'),
  ('Paper 30', 'Conference C', '2023-01-22');
    `,
  `
    INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor)
VALUES
  ('John Doe', 'University A', '1980-01-01', 10, 'Male', NULL),
  ('Jane Smith', 'University B', '1985-05-15', 15, 'Female', NULL),
  ('Alice Johnson', 'University C', '1990-03-20', 8, 'Female', 1),
  ('Bob Anderson', 'University A', '1982-07-10', 12, 'Male', 2),
  ('Eva Martinez', 'University D', '1988-12-05', 9, 'Female', 3),
  ('Michael Clark', 'University B', '1986-09-18', 11, 'Male', 2),
  ('Laura White', 'University C', '1987-06-03', 14, 'Female', 1),
  ('David Lee', 'University D', '1984-11-30', 7, 'Male', 5),
  ('Sarah Brown', 'University A', '1992-03-08', 13, 'Female', 6),
  ('Robert Martin', 'University E', '1981-08-22', 10, 'Male', 4),
  ('Emily Taylor', 'University B', '1989-05-10', 12, 'Female', 7),
  ('William Johnson', 'University A', '1983-02-15', 9, 'Male', 5),
  ('Grace Davis', 'University C', '1987-07-28', 11, 'Female', 3),
  ('Daniel Adams', 'University D', '1980-12-01', 8, 'Male', 2),
  ('Olivia Harris', 'University E', '1991-09-05', 15, 'Female', 4);
    `,
  `
  INSERT INTO AuthorResearchPapers (author_id, paper_id)
  VALUES
  (8, 26), (12, 26), (12, 15), (11, 12), (6, 28), (15, 9),
  (2, 3), (13, 11), (7, 7), (4, 22), (9, 17),
  (3, 8), (5, 25), (14, 21), (1, 6), (10, 30),
  (13, 24), (15, 16), (6, 29), (11, 5), (12, 18),
  (8, 2), (7, 10), (2, 27), (9, 1), (4, 20),
  (3, 23), (5, 14), (1, 13), (10, 19), (14, 4),
  (5, 27), (1, 17), (8, 10), (11, 21), (4, 9);  
    `,
];

executeQueries(connection, queries);
