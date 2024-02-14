require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const deleteProfile = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`deleteProfile.js deleteProfile connected!`);
    const userId = req.params.userId;
    const resultDeleteProfile = await db.collection("Profile").deleteOne({ "User._id": userId });
    resultDeleteProfile.deletedCount
      ? res.status(200).json({ status: 200, data: resultDeleteProfile, message: `Profile for user id ${userId} deleted` })
      : res.status(404).json({ status: 404, data: req.params.userId, message: `Profile for user id  ${userId} not found` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: req.params.userId, message: `Internal error deleting profilefor user id ${userId}:`, error });

  } finally {
    client.close();
    console.log(`BE deleteProfile.js deleteProfile() disconnected!`);
  }
}

module.exports = { deleteProfile };
