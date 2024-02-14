require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const supportMail = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`supportMail.js supportMail connected!`);

    const resultSupportMailCreated = await db.collection("Support").insertOne(req.body);

    resultSupportMailCreated && resultSupportMailCreated.insertedId
      ? res.status(201).json({ status: 201, data: resultSupportMailCreated, message: `Support Mail Id ${resultSupportMailCreated.insertedId} created` })
      : res.status(500).json({ status: 500, data: req.body, message: `Internal error creating support mail` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.body, message: `Internal error creating support mail: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE supportMail.js supportMail() disconnected!`);
  }
}

module.exports = { supportMail };