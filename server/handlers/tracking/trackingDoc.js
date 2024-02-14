require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const trackingDocNew = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`trackingDocNew.js trackingDocNew connected!`);

    const resultTrackingDocNew = await db.collection("Tracking").insertOne(req.body);

    resultTrackingDocNew && resultTrackingDocNew.insertedId
      ? res.status(201).json({ status: 201, data: resultTrackingDocNew, message: `Tracking Document Id ${resultTrackingDocNew.insertedId} created` })
      : res.status(500).json({ status: 500, data: req.body, message: `Internal error creating new Tracking Document` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.body, message: `Internal error creating new Tracking Document: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE trackingDocNew.js trackingDocNew() disconnected!`);
  }
}

module.exports = { trackingDocNew };