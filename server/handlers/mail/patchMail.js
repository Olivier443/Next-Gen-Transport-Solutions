require("dotenv").config();

const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const patchMail = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`patchMail.js patchMail connected!`);

    const mailId = req.params.mailId;

    const objToReplace = { ...req.body };

    delete objToReplace._id;

    const result = await db.collection("Mails").replaceOne({ _id: new ObjectId(req.body._id) }, objToReplace);

    result && result.modifiedCount
      ? res.status(200).json({ status: 200, data: result, message: `Id ${req.body._id} patchMail updated` })
      : res.status(404).json({ status: 404, data: req.body.userId, message: `No change found` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: objToReplace, message: `Internal error updating mail ${req.body._id}: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE patchMail.js patchMail() disconnected!`);
  }
}

module.exports = { patchMail };
