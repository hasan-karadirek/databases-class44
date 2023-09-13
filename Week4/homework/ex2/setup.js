const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri);

async function setupDb() {
  await client.connect();

  const db = client.db("databaseweek4");
  const collection = db.collection("transaction");

  const accounts = [
    {
      account_number: 101,
      balance: 5000.0,
      account_changes: [
        { change_number: 1, amount: 5000.0, remark: "Initial deposit" },
      ],
    },
    {
      account_number: 102,
      balance: 3000.0,
      account_changes: [
        { change_number: 1, amount: 3000.0, remark: "Initial deposit" },
      ],
    },
  ];

  await collection.insertMany(accounts);
  console.log("Data inserted");
}

setupDb().catch(console.error);
