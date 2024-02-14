require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const storeBulkRequestId = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`storeBulkRequestId.js storeBulkRequestId connected!`);

    const storeBulkRequestId = req.params.bulkRequestId;

    const resultCarrierReplyToClient = await db.collection("Mails").find({ "storeBulkRequestId": storeBulkRequestId }).sort({ _id: -1 }).toArray();

    return resultCarrierReplyToClient
      ? res.status(200).json({ status: 200, data: resultCarrierReplyToClient, message: `${resultCarrierReplyToClient} reply from carrier to client found` })
      : res.status(404).json({ status: 404, data: resultCarrierReplyToClient, message: `reply from carrier to client foun ${thisBulkRequesttId} not found` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: resultCarrierReplyToClient, message: `Internal error displaying route ${bulkRequestId}: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`storeBulkRequestId.js storeBulkRequestId() disconnected!`);
  }
}

module.exports = { storeBulkRequestId };
