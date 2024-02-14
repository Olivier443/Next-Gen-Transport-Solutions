require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const getUserMails = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`getUserMails.js getUserMails connected!`);

    const userId = req.params.userId;
    const mailOption = req.params.mailOption;

    let filter = null;
    switch (mailOption) {
      case 'UNREAD':
        filter = { "toId": userId, "toStatus": 'UNREAD' };
        break;

      case 'RECEIVED':
        filter = { "toId": userId };
        break;

      case 'REPLIED':
        filter = { "toId": userId, "fromStatus": 'REPLIED' };
        break;

      case 'SENT':
        filter = { "fromId": userId };
        break;

      case 'SENT&REPLIED':
        filter = { $or: [{ "toId": userId }, { "fromId": userId }] };
        break;

      case 'SUPPORT':
        filter = { $or: [{ "fromId": userId, "toId": "support" }, { "fromId": "support", "toId": userId }] };
        break;

      default:  // Can be 'null' to return only 'select an option!' message
        break;
    }

    if (filter) {
      const resultGetUserMails = await db.collection("Mails").find(filter).sort({ _id: -1 }).toArray();

      return resultGetUserMails
        ? res.status(200).json({ status: 200, data: resultGetUserMails, message: `${resultGetUserMails.length} ${mailOption} mails found` })
        : res.status(404).json({ status: 404, data: resultGetUserMails, message: `mail to user ${resultGetUserMails} not found` })
    } else {
      res.status(404).json({ status: 404, message: `Please, select an option!` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: userId, message: `Internal error displaying mail to ${userId}: ${JSON.stringify(error)}` })

  } finally {
    client.close();
    console.log(`getMail.js getMail() disconnected!`);
  }
}

module.exports = { getUserMails }
