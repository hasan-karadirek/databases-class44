const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri);

async function transfer(fromAccountNumber, toAccountNumber, amount, remark) {
  const db = client.db("databaseweek4");

  const session = db.client.startSession();

  try {
    session.startTransaction();

    const fromAccount = await db
      .collection("transaction")
      .findOne({ account_number: fromAccountNumber });
    const toAccount = await db
      .collection("transaction")
      .findOne({ account_number: toAccountNumber });

    if (!fromAccount || !toAccount) {
      throw new Error("One or both accounts not found");
    }

    if (fromAccount.balance < amount) {
      throw new Error("Insufficient balance for the transfer");
    }

    const timestamp = new Date();
    const changeNumber =
      Math.max(
        ...fromAccount.account_changes.map((change) => change.change_number),
        ...toAccount.account_changes.map((change) => change.change_number)
      ) + 1;

    const fromChange = {
      change_number: changeNumber,
      amount: -amount,
      changed_date: timestamp,
      remark: remark,
    };
    const toChange = {
      change_number: changeNumber + 1,
      amount: amount,
      changed_date: timestamp,
      remark: remark,
    };

    await db.collection("accounts").updateOne(
      { account_number: fromAccountNumber },
      {
        $inc: { balance: -amount },
        $push: { account_changes: fromChange },
      },
      { session }
    );

    await db.collection("transaction").updateOne(
      { account_number: toAccountNumber },
      {
        $inc: { balance: amount },
        $push: { account_changes: toChange },
      },
      { session }
    );

    await session.commitTransaction();
    console.log("Transaction completed.");
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

transfer(101, 102, 1000.0, "Transfer from account 101 to account 102").catch(
  console.error
);
