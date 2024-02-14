require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const profile = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`profile.js profile connected!`);

    const resultProfileCreated = await db.collection("Profile").insertOne(req.body);

    resultProfileCreated && resultProfileCreated.insertedId
      ? res.status(201).json({ status: 201, data: resultProfileCreated, message: `Id ${resultProfileCreated.insertedId} profile created for profile ${req.body}` })
      : res.status(500).json({ status: 500, data: req.body, message: `Internal error creating new profile` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.body, message: `Internal error creating new route: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE profile.js profile() disconnected!`);
  }
}

module.exports = { profile };