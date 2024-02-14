require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const theBulkRequestId = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`theBulkRequestId.js theBulkRequestId connected!`);
    const thisBulkRequestId = req.params.bulkRequestId;
    const resultThisBulkRequestId = await db.collection("ClientBulkRequest").findOne({ _id: new ObjectId(thisBulkRequestId) });

    resultThisBulkRequestId
      ? res.status(200).json({ status: 200, data: resultThisBulkRequestId, message: `Id ${thisBulkRequestId} bulk request found` })
      : res.status(404).json({ status: 404, data: req.params.bulkRequestId, message: `Bulk request ${thisBulkRequestId} not found` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.params.bulkRequestId, message: `Internal error displaying bulk request ${req.params.bulkRequestId}: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE bulkRequestId.js bulkRequestId() disconnected!`);
  }
}

module.exports = { theBulkRequestId };
