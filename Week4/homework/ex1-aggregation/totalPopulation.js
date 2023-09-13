const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const mongoUri = process.env.MONGO_URI;

async function getTotalPopulationByCountryAndYear(year, country) {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();

    const db = client.db("databaseweek4");
    const collection = db.collection("population");

    const pipeline = [
      {
        $match: {
          Year: year,
          Country: country,
        },
      },
      {
        $addFields: {
          M: { $toInt: "$M" },
          F: { $toInt: "$F" },
          TotalPopulation: { $add: ["$M", "$F"] },
        },
      },
      {
        $group: {
          _id: "$Year",
          countPopulation: { $sum: "$TotalPopulation" },
        },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();

    return result.map((item) => ({
      _id: item._id,
      countPopulation: item.countPopulation,
    }));
  } catch (err) {
    console.error("Error:", err);
  } finally {
    client.close();
  }
}

// Example usage:
getTotalPopulationByCountryAndYear(2020, "Netherlands").then(console.log);
