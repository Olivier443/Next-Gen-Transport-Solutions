require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const allTrackingDocuments = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  const carrierId = req.params.carrierId;

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`allTrackingDocuments.js allTrackingDocuments connected!`);
    const resultAllTrackingDocuments = await db.collection("Tracking").find({ "currentUser._id": carrierId }).sort({ _id: -1 }).toArray();

    return resultAllTrackingDocuments
      ? res.status(200).json({ status: 200, data: resultAllTrackingDocuments, message: `${resultAllTrackingDocuments} tracking documents found` })
      : res.status(404).json({ status: 404, data: resultAllTrackingDocuments, message: `No Tracking Documents found ${resultAllTrackingDocuments}` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: error, message: `Internal error displaying tracking documents: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`allTrackingDocuments.js allTrackingDocuments() disconnected!`);
  }
}

module.exports = { allTrackingDocuments };
