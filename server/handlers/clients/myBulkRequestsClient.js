require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const myBulkRequestsClient = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`bulkRequest.js bulkRequest connected!`);

    const thisClientId = req.params.clientid;

    const resultMyBulkRequestsClientList = await db.collection("ClientBulkRequest").find({ "currentUser._id": thisClientId }).sort({ _id: -1 }).toArray();

    return resultMyBulkRequestsClientList
      ? res.status(200).json({ status: 200, data: resultMyBulkRequestsClientList, message: `${resultMyBulkRequestsClientList} route found` })
      : res.status(404).json({ status: 404, data: resultMyBulkRequestsClientList, message: `Routes ${resultMyBulkRequestsClientList} not found` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: resultMyBulkRequestsClientList, message: `Internal error displaying bulk request ${resultMyBulkRequestsClientList}: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE bulkRequest.js bulkRequest() disconnected!`);
  }
}

module.exports = { myBulkRequestsClient };