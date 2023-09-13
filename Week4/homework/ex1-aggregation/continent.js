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

    const pipeline = [
      {
        $match: {
          Year: year,
          Age: age,
        },
      },
      {
        $addFields: {
          TotalPopulation: { $add: ["$M", "$F"] },
        },
      },
      {
        $group: {
          _id: "$_id",
          Country: { $first: "$Country" },
          Year: { $first: "$Year" },
          Age: { $first: "$Age" },
          M: { $sum: "$M" },
          F: { $sum: "$F" },
          TotalPopulation: { $sum: "$TotalPopulation" },
        },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();

    return result.map((item) => ({
      _id: item._id,
      Country: item.Country,
      Year: item.Year,
      Age: item.Age,
      M: item.M,
      F: item.F,
      TotalPopulation: item.TotalPopulation,
    }));
  } catch (err) {
    console.error("Error:", err);
  } finally {
    client.close();
  }
}

// Example usage:
getContinentInformationByYearAndAge(2010, "100+").then(console.log);
