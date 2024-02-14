require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const newMail = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`newMail.js createMail connected!`);

    const resultMailCreated = await db.collection("Mails").insertOne(req.body);

    resultMailCreated && resultMailCreated.insertedId
      ? res.status(201).json({ status: 201, data: resultMailCreated, message: `Mail Id ${resultMailCreated.insertedId} created` })
      : res.status(500).json({ status: 500, data: req.body, message: `Internal error creating new mail` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.body, message: `Internal error creating new mail: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE newMail.js createMail() disconnected!`);
  }
}

module.exports = { newMail };