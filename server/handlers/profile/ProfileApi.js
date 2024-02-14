require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const getProfileFromUserId = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`ProfileApi.js getProfileFromUserId connected!`);
    const userId = req.params.userId;
    const resultGetProfile = await db.collection("Profile").findOne({ 'User._id': userId });

    resultGetProfile
      ? res.status(200).json({ status: 200, data: resultGetProfile, message: `Id ${userId} profile found` })
      : res.status(404).json({ status: 404, data: req.params.profileId, message: `userId ${userId} profile not found` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.params.profileId, message: `Internal error displaying profile for user id: ${userId}: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`BE getProfile.js getProfile() disconnected!`);
  }
}

module.exports = { getProfileFromUserId };
