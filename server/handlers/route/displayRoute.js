require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const displayRoute = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  let routeId = '';
  routeId = req.params.routeId;

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`displayRoute.js displayRoute connected!`);

    const resultRouteDisplay = await db.collection("Routes").findOne({ _id: new ObjectId(routeId) });

    resultRouteDisplay
      ? res.status(200).json({ status: 200, data: resultRouteDisplay, message: `Id ${routeId} route found` })
      : res.status(404).json({ status: 404, data: req.params.routeId, message: `Route ${routeId} not found` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.params.routeId, message: `Internal error displaying route ${routeId}: ${error}` })

  } finally {
    client.close();
    console.log(`BE displayRoute.js displayRoute() disconnected!`);
  }
}

module.exports = { displayRoute };
