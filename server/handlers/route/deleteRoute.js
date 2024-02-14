require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const deleteRoute = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`displayRoute.js displayRoute connected!`);
    const routeId = req.params.routeId;
    const resultDeleteRoute = await db.collection("Routes").deleteOne({ _id: new ObjectId(routeId) });

    resultDeleteRoute.deletedCount
      ? res.status(200).json({ status: 200, data: resultDeleteRoute, message: `Id ${routeId} route deleted` })
      : res.status(404).json({ status: 404, data: req.params.routeId, message: `Route ${routeId} not found` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.params.routeId, message: `Internal error displaying route ${req.params.routeId}: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE deleteRoute.js deleteRoute() disconnected!`);
  }
}

module.exports = { deleteRoute };
