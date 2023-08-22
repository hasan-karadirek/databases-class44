const mysql = require('mysql');

const dbConfig = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database:'new_world'
};

const connection = mysql.createConnection(dbConfig);

// Connect to the MySQL server
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    connection.end(); // Close the connection
    return;
  }

    useDatabase()
    // execute queries
    executeQueries(queries)
    // close connection 
    connection.end()

});


const useDatabase=() => {
  connection.query('USE new_world', (error) => {
    if (error) {
      console.error('Error using database:', error);
    } else {
      console.log('Using meetup database.');
    }

  });
}

const executeQueries=(queries)=>{
    for(let query of queries){
        connection.query(query, (error,results) => {
            console.log(results)
        if (error) {
          console.log(`Error execution of ${query}`, error);
        } else {
          console.log(`query executed: ${query}.`);
        }
        
      })

    }
}

const queries=[
    `
      SELECT name FROM country WHERE Population>=8000000
    `,
    `
      SELECT name FROM country WHERE name LIKE '%{$land}%'
    `,
    `
      SELECT name FROM country WHERE Population>=500000 AND Population=<100000
    `,
    `
      SELECT name FROM country WHERE Population>=8000000
    `,
    `
      SELECT name FROM country ORDER BY SurfaceArea ASC
    `,
    `
      SELECT name FROM city WHERE CountryCode='NLD'
    `,
    `
      SELECT Population FROM city WHERE name='Rotterdam'
    `,
    `
      SELECT name FROM country ORDER BY SurfaceArea DESC LIMIT 10
    `,
    `
      SELECT Name FROM city ORDER BY Population DESC LIMIT 10
    `,
    `
    SELECT SUM(Population) FROM country
    `
    
    
    
]