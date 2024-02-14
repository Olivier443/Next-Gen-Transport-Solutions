require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const carriersList = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`carriersList.js carriersList connected!`);

    const resultCarriersList = await db.collection("Users").find({ "type": "Carrier" }).toArray();

    const carrierArray = [];

    resultCarriersList.map((aCarrier) => {
      delete aCarrier.passwd;
      carrierArray.push(aCarrier);
    })

    return (carrierArray.length > 0)
      ? res.status(200).json({ status: 200, data: carrierArray, message: `carrier List found: ${JSON.stringify(carrierArray)}` })
      : res.status(404).json({ status: 404, data: carrierArray, message: `Carrier List not found: ${JSON.stringify(carrierArray)}` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: { "type": "Carrier" }, message: `Internal error searching carriersList: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`carriersList.js carriersList() disconnected!`);
  }
}

module.exports = { carriersList };
