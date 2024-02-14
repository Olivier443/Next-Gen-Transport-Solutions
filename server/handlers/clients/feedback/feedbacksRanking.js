require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

// return all feedbacks on a carrier id
const feedbacksRanking = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`feedbacksRanking.js feedbacksRanking connected!`);

    const carrierId = req.params.carrierId;

    const resultfeedbacksRanking = await db.collection("Feedback").find({ carrierId: carrierId }).sort({ _id: -1 }).toArray();

    return resultfeedbacksRanking
      ? res.status(200).json({ status: 200, data: resultfeedbacksRanking, message: `${resultfeedbacksRanking} feedbacks found` })
      : res.status(404).json({ status: 404, data: resultfeedbacksRanking, message: `No feedbacks found for this carrier ${resultAllClientTrackingDocs}` })

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: error, message: `Internal error displaying feedbacks: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`feedbacksRanking.js feedbacksRanking() disconnected!`);
  }
}

module.exports = { feedbacksRanking };
