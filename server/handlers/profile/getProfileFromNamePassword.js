require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const getProfileFromNamePassword = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`getProfile.js getProfile connected!`);
    const name = req.body.name;
    const password = req.body.passwd;
    const resultGetProfile = await db.collection("Profile").findOne({ name: name, password: password });

    resultGetProfile
      ? res.status(200).json({ status: 200, data: resultGetProfile, message: `Id ${name} profile found` })
      : res.status(404).json({ status: 404, data: req.params.profileId, message: `Name not found or wrong password` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.params.profileId, message: `Internal error displaying profile ${profileId}: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE getProfile.js getProfile() disconnected!`);
  }
}

module.exports = { getProfileFromNamePassword };
