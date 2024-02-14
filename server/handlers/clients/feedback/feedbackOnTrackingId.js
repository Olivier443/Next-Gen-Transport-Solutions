require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

// return an eventual feedbacks on a tracking id
const feedbackOnTrackingId = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  const trackingId = req.params.trackingId;

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`feedbackOnTrackingId.js feedbackOnTrackingId connected!`);

    const resultFeedbackOnTrackingId = await db.collection("Feedback").findOne({ "trackingId": trackingId });

    return resultFeedbackOnTrackingId
      ? res.status(200).json({ status: 200, data: resultFeedbackOnTrackingId, message: `${resultFeedbackOnTrackingId} feedback found` })
      : res.status(404).json({ status: 404, data: resultFeedbackOnTrackingId, message: `No feedbacks found for tracking id ${trackingId}` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: error, message: `Internal error getting feedback on tracking id ${trackingId}, ${error}` })

  } finally {
    client.close();
    console.log(`feedbacksRanking.js feedbacksRanking() disconnected!`);
  }
}

module.exports = { feedbackOnTrackingId };
