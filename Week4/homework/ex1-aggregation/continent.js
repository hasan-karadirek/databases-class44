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
          Year: 2020,
          Age: "100+",
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
          _id: "$Country",
          Year: { $first: "$Year" },
          Age: { $first: "$Age" },
          M: { $sum: "$M" },
          F: { $sum: "$F" },
          TotalPopulation: { $sum: "$TotalPopulation" },
        },
      },
    ];

    console.log("Pipeline:", JSON.stringify(pipeline, null, 2));

    const result = await collection.aggregate(pipeline).toArray();
    console.log("Result:", JSON.stringify(result, null, 2));

    return result.map((item) => ({
      _id: new ObjectId(),
      Country: item._id,
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
