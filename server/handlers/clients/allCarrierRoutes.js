require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const allCarrierRoutes = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`allCarrierRoutes.js allCarrierRoutes connected!`);

    const resultAllCarrierRoutes = await db.collection("Routes").find().sort({ _id: -1 }).toArray();

    return resultAllCarrierRoutes
      ? res.status(200).json({ status: 200, data: resultAllCarrierRoutes, message: `${resultAllCarrierRoutes} route found` })
      : res.status(404).json({ status: 404, data: resultAllCarrierRoutes, message: `Routes ${resultAllCarrierRoutes} not found` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: resultAllCarrierRoutes, message: `Internal error displaying route ${resultAllCarrierRoutes}: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`allCarrierRoutes.js allCarrierRoutes() disconnected!`);
  }
}

module.exports = { allCarrierRoutes };
