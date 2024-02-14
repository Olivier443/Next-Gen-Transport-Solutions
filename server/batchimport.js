const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const dataRoutes = require("./routes.json");
const dataTrucks = require("./truckList.json");

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connected!");
    const db = client.db("Next-Gen"); 
    const resultRoutes = await db.collection("Routes").insertMany(dataRoutes); 
    const resultTruckList = await db.collection("Trucks").insertMany(dataTrucks); 
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
    console.log("disconnected!");
  }
}

batchImport();