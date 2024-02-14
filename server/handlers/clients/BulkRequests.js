require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const BulkRequests = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`BulkRequests.js BulkRequests connected!`);
    const resultBulkRequests = await db.collection("ClientBulkRequest").find().sort({ _id: -1 }).toArray();

    return resultBulkRequests
      ? res.status(200).json({ status: 200, data: resultBulkRequests, message: `${resultBulkRequests} bulk request found` })
      : res.status(404).json({ status: 404, data: resultBulkRequests, message: `Bulk Request ${resultBulkRequests} not found` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: resultBulkRequests, message: `Internal error displaying route ${resultBulkRequests}: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BulkRequests.js BulkRequests() disconnected!`);
  }
}

module.exports = { BulkRequests };
