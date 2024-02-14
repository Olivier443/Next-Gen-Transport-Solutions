require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const getMail = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`getMail.js getMail connected!`);

    const thisBulkRequesttId = req.params.bulkRequestId;

    const resultCarrierReplyToClient = await db.collection("Mails").find({ "bulkRequestId": thisBulkRequesttId }).sort({ _id: -1 }).toArray();

    return resultCarrierReplyToClient
      ? res.status(200).json({ status: 200, data: resultCarrierReplyToClient, message: `${resultCarrierReplyToClient} reply from carrier to client found` })
      : res.status(404).json({ status: 404, data: resultCarrierReplyToClient, message: `reply from carrier to client ${thisBulkRequesttId} not found` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: resultCarrierReplyToClient, message: `Internal error displaying route ${bulkRequestId}: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`getMail.js getMail() disconnected!`);
  }
}

module.exports = { getMail };
