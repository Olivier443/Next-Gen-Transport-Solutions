require("dotenv").config();

const { MongoClient } = require("mongodb");
// const { v4: uuidv4 } = require("uuid");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const createRoute = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`createRoute.js createRoute connected!`);

    const resultRouteCreated = await db.collection("Routes").insertOne(req.body);

    resultRouteCreated && resultRouteCreated.insertedId
      ? res.status(201).json({ status: 201, data: resultRouteCreated, message: `Id ${resultRouteCreated} route created for routeId ${req.body._id}` })
      : res.status(500).json({ status: 500, data: req.body, message: `Internal error creating new route` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.body, message: `Internal error creating new route: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE createRoute.js createRoute() disconnected!`);
  }
}

module.exports = { createRoute };