require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const bulkRequest = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`bulkRequest.js bulkRequest connected!`);

    const resultBulkRequestCreated = await db.collection("ClientBulkRequest").insertOne(req.body);

    resultBulkRequestCreated && resultBulkRequestCreated.insertedId
      ? res.status(201).json({ status: 201, data: resultBulkRequestCreated, message: `Id ${resultBulkRequestCreated} bulkRequest created for bulkRequest ${req.body}` })
      : res.status(500).json({ status: 500, data: req.body, message: `Internal error creating new bulkRequest` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.body, message: `Internal error creating new client bulkRequest: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE bulkRequest.js bulkRequest() disconnected!`);
  }
}

module.exports = { bulkRequest };