const fs = require("fs");
const csv = require("csv-parser");
const { MongoClient } = require("mongodb");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const csvFilePath = `${path.join(
  __dirname,
  "population_pyramid_1950-2022.csv"
)}`;
const mongoUri = process.env.MONGO_URI;

async function importData() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();

    const db = client.db("databaseweek4");
    const collection = db.collection("population");

    const stream = fs.createReadStream(csvFilePath).pipe(csv());
    const dataArr = [];

    stream.on("data", (row) => {
      dataArr.push(row);
    });

    stream.on("end", async () => {
      try {
        const result = await collection.insertMany(dataArr);
        console.log(
          `CSV data has been imported into MongoDB. Inserted ${result.insertedCount} documents`
        );
      } catch (err) {
        console.error("Error inserting data:", err);
      } finally {
        client.close();
      }
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

importData();
