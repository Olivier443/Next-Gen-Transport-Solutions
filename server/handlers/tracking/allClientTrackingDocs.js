require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const allClientTrackingDocs = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`allClientTrackingDocs.js allClientTrackingDocs connected!`);

    const clientid = req.params.clientid;

    const resultAllClientTrackingDocs = await db.collection("Tracking").find({ TrackingDocClientId: clientid }).sort({ _id: -1 }).toArray();

    return resultAllClientTrackingDocs
      ? res.status(200).json({ status: 200, data: resultAllClientTrackingDocs, message: `${resultAllClientTrackingDocs} tracking documents found` })
      : res.status(404).json({ status: 404, data: resultAllClientTrackingDocs, message: `No Tracking Documents found ${resultAllClientTrackingDocs}` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: error, message: `Internal error displaying tracking documents: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`allClientTrackingDocs.js allClientTrackingDocs() disconnected!`);
  }
}

module.exports = { allClientTrackingDocs };
