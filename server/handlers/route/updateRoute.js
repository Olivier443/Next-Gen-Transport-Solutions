require("dotenv").config();

const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const updateRoute = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`updateRoute.js updateRoute connected!`);

    const objToReplace = { ...req.body };

    delete objToReplace._id;

    const result = await db.collection("Routes").replaceOne({ _id: new ObjectId(req.body._id) }, objToReplace);

    result && result.modifiedCount
      ? res.status(200).json({ status: 200, data: result, message: `Id ${req.body._id} route updated` })
      : res.status(500).json({ status: 500, data: req.body.userId, message: `Internal error updating route` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: objToReplace, message: `Internal error displaying profile ${objToReplace}: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE updateRoute.js updateRoute() disconnected!`);
  }
}

module.exports = { updateRoute };
