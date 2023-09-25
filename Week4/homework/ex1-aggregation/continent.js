const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const mongoUri = process.env.MONGO_URI;
async function getContinentInformationByYearAndAge(year, age) {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();

    const db = client.db("databaseweek4");
    const collection = db.collection("population");
    const continentNames = [
      "AFRICA",
      "ASIA",
      "EUROPE",
      "LATIN AMERICA AND THE CARIBBEAN",
      "NORTHERN AMERICA",
      "OCEANIA",
    ];

    const pipeline = [
      {
        $match: {
          Country: { $in: continentNames },
          Year: year,
          Age: age,
        },
      },
      {
        $addFields: {
          TotalPopulation: { $add: ["$M", "$F"] },
        },
      },
    ];

    return await collection.aggregate(pipeline).toArray();
  } catch (err) {
    console.error("Error:", err);
  } finally {
    client.close();
  }
}

// Example usage:
getContinentInformationByYearAndAge(2010, "100+").then(console.log);
