require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const aTrackingDocumentDeleted = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`aTrackingDocumentDeleted.js aTrackingDocumentDeleted connected!`);

    const trackingDocId = req.params.trackingDocId;

    const resultDeleteTrackingDoc = await db.collection("Tracking").deleteOne({ _id: new ObjectId(trackingDocId) });

    resultDeleteTrackingDoc.deletedCount
      ? res.status(200).json({ status: 200, data: resultDeleteTrackingDoc, message: `Id ${trackingDocId} tracking document deleted` })
      : res.status(404).json({ status: 404, data: req.params.trackingDocId, message: `Tracking Document ${trackingDocId} not found` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.params.trackingDocId, message: `Internal error deleting tracking document ${req.params.trackingDocId}: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE aTrackingDocumentDeleted.js aTrackingDocumentDeleted() disconnected!`);
  }
}

module.exports = { aTrackingDocumentDeleted };
