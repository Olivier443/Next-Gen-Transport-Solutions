require("dotenv").config();

const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const aTrackingDocumentUpdate = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`aTrackingDocumentUpdate.js aTrackingDocumentUpdate connected!`);

    const trackingStatus = req.body.trackingStatus; // This is the new tracking status we got with the useRef
    const _id = req.body.trackingDocumentId;

    const resultATrackingDocumentUpdate = await db.collection("Tracking").updateOne({ _id: new ObjectId(_id) }, { $set: { TrackingDocTrackingStatus: trackingStatus } });

    (resultATrackingDocumentUpdate && resultATrackingDocumentUpdate.modifiedCount)
      ? res.status(200).json({ status: 200, data: resultATrackingDocumentUpdate, message: `Tracking Status of Document Id ${_id} updated` })
      : res.status(404).json({ status: 404, data: req.body, message: `No Tracking Status Modification Required` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.body, message: `Internal error updating Tracking Status of the Tracking Document: ${JSON.stringify(req.body.trackingDocumentId)} ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE aTrackingDocumentUpdate.js aTrackingDocumentUpdate() disconnected!`);
  }
}

module.exports = { aTrackingDocumentUpdate };