require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const allRoutes = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`allRoutes.js allRoutes connected!`);

    const thisCarrierId = req.params.carrierId;

    const resultAllRoutes = await db.collection("Routes").find({ "currentUser._id": thisCarrierId }).sort({ _id: -1 }).toArray();

    return resultAllRoutes
      ? res.status(200).json({ status: 200, data: resultAllRoutes, message: `${resultAllRoutes} route found` })
      : res.status(404).json({ status: 404, data: resultAllRoutes, message: `Routes ${resultAllRoutes} not found` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: resultAllRoutes, message: `Internal error displaying route ${resultAllRoutes}: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`allRoutes.js allRoutes() disconnected!`);
  }
}

module.exports = { allRoutes };
