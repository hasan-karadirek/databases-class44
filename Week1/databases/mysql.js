const mysql = require("mysql");

const dbConfig = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
};

const connection = mysql.createConnection(dbConfig);

// Connect to the MySQL server
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    connection.end(); // Close the connection
    return;
  }

  // Drop the existing database (if it exists)
  dropDatabase();
  // next step create database
  createDatabase();
  // next step use database
  useDatabase();
  // execute queries
  runQueries(queries);
  // close connection
  connection.end();
});

const dropDatabase = () => {
  connection.query("DROP DATABASE IF EXISTS meetup", (error) => {
    if (error) {
      console.error("Error dropping database:", error);
    } else {
      console.log("Database dropped.");
    }
  });
};

const createDatabase = () => {
  connection.query("CREATE DATABASE meetup", (error) => {
    if (error) {
      console.error("Error creating database:", error);
    } else {
      console.log("Database created.");
    }
  });
};

const useDatabase = () => {
  connection.query("USE meetup", (error) => {
    if (error) {
      console.error("Error using database:", error);
    } else {
      console.log("Using meetup database.");
    }
  });
};

const runQueries = (queries) => {
  for (let query of queries) {
    connection.query(query, (error) => {
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
      CREATE TABLE Invitee (
        invitee_no INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        invitee_name VARCHAR(255),
        invited_by INT
      )
    `,
  `
      CREATE TABLE Room (
        room_no INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        room_name VARCHAR(255),
        floor_number TINYINT
      )
    `,
  `
      CREATE TABLE Meeting (
        meeting_no INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        meeting_title VARCHAR(255),
        starting_time DATETIME,
        ending_time DATETIME,
        room_no INT,
        FOREIGN KEY (room_no) REFERENCES Room(room_no)
      )
    `,
  `
      INSERT INTO Invitee (invitee_name, invited_by)
      VALUES
        ('John Doe', NULL),
        ('Jane Smith', NULL),
        ('Alice Johnson', 1),
        ('Bob Anderson', 2),
        ('Eva Martinez', 3)
    `,
  `
      INSERT INTO Room (room_name, floor_number)
      VALUES
        ('Conference Room A', 1),
        ('Conference Room B', 2),
        ('Boardroom', 3),
        ('Training Room', 1),
        ('Breakout Room', 2)
    `,
  `
      INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
      VALUES
        ('Project Kickoff', '2023-08-22 09:00:00', '2023-08-22 11:00:00', 1),
        ('Team Discussion', '2023-08-23 14:00:00', '2023-08-23 16:00:00', 2),
        ('Client Presentation', '2023-08-24 10:00:00', '2023-08-24 12:00:00', 3),
        ('Training Session', '2023-08-25 13:00:00', '2023-08-25 15:00:00', 4),
        ('Brainstorming', '2023-08-26 11:00:00', '2023-08-26 13:00:00', 5)
    `,
];
