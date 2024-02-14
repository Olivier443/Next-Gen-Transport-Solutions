require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const clientProfile = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`clientProfile.js profile connected!`);

    const resultClientProfileCreated = await db.collection("Profile").insertOne(req.body);

    resultClientProfileCreated && resultClientProfileCreated.insertedId
      ? res.status(201).json({ status: 201, data: resultClientProfileCreated, message: `Profile Id ${resultClientProfileCreated.insertedId} created` })
      : res.status(500).json({ status: 500, data: req.body, message: `Internal error creating new clientProfile` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.body, message: `Internal error creating new client profile: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE clientProfile.js clientProfile() disconnected!`);
  }
}

module.exports = { clientProfile };