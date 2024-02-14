require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const feedback = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`feedback.js feedback connected!`);

    const resultFeedback = await db.collection("Feedback").insertOne(req.body);

    resultFeedback && resultFeedback.insertedId
      ? res.status(201).json({ status: 201, data: resultFeedback, message: `Feedback Id ${resultFeedback.insertedId} created` })
      : res.status(404).json({ status: 404, data: req.body, message: `Internal error creating Feedback` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.body, message: `Internal error creating Feedback: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE feedback.js feedback() disconnected!`);
  }
}

module.exports = { feedback };