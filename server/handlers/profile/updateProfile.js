require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const updateProfile = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`updateProfile.js updateProfile connected!`);

    const profileId = req.body._id;
    const objToReplace = { ...req.body };
    delete objToReplace._id;

    const resultUpdateProfile = await db.collection("Profile").replaceOne({ _id: new ObjectId(profileId) }, objToReplace);

    resultUpdateProfile
      ? res.status(200).json({ status: 200, data: resultUpdateProfile, message: `Profile ${profileId} profile updated` })
      : res.status(404).json({ status: 404, data: req.params.profileId, message: `Profile ${profileId} not found` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.params.profileId, message: `Internal error displaying profile ${profileId}: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE updateProfile.js updateProfile() disconnected!`);
  }
}

module.exports = { updateProfile };
