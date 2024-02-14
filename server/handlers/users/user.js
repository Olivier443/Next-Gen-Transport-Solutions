require("dotenv").config();
// const stringify = require("../utils/util");

const bcrypt = require('bcrypt');

const { MONGO_URI } = process.env;

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};
const { MongoClient } = require("mongodb");

const getOrCreateUser = async (req, res) => {

  const action = req.body.action;

  switch (action) {
    case "get":
      getUserByIdAndPasswd(req, res);
      break;

    case "create":
      createUser(req, res);
      break;

    default:
      break;
  }
}

// GET user by _id
const getUserById = async (req, res) => {

  const mongoClient = new MongoClient(MONGO_URI, options);

  const userId = req.params._id;

  try {
    const db = mongoClient.db("Next-Gen");

    const user = await db.collection("Users").findOne({ _id: userId });


    user && delete user.passwd; // Avoid returning any password to FE

    user
      ? res.status(200).json({ status: 200, data: user })
      : res.status(400).json({ status: 400, data: userId, message: `User ${userId} not found.` });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, data: null, message: `Internal server error` });

  } finally {
    mongoClient.close();
    console.log("disconnected!");
  }
};

// https://stackoverflow.com/questions/58224867/bcrypt-compare-is-asynchronous-does-that-necessarily-mean-that-delays-are-cer
function compareAsync(param1, param2) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(param1, param2, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

const getUserByIdAndPasswd = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { _id, passwd } = req.body;
  if (_id.length && passwd.length) {
    try {

      await client.connect();
      const db = client.db("Next-Gen");
      console.log(`BE users.js getUserByIdAndPasswd connected!`);

      const typedPassword = passwd;

      const user = await db.collection("Users").findOne({ _id: _id });

      if (!user) {
        res.status(404).json({ status: 404, data: _id, message: `Wrong identifiant or password` })
      } else {

        const hash = user.passwd;

        // const result = await compareAsync(passwd, hash);
        const result = await compareAsync(typedPassword, hash);

        if (!result) {
          res.status(404).json({ status: 404, data: _id, message: `Wrong identifiant or password` })
        } else {

          user && delete user.passwd; // Avoid returning any password to FE

          user
            ? res.status(200).json({ status: 200, data: user, message: `user ${_id} logged in` })
            : res.status(404).json({ status: 404, data: _id, message: `Wrong identifiant or password` })
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 500, data: req.body, message: error })

    } finally {
      client.close();
      console.log(`BE users.js getUserByIdAndPasswd disconnected!`);
    }
  } else {
    res.status(404).json({ status: 404, data: _id, message: `Missing identifiant and/or password` })
  }
};

const createUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { _id, passwd, type, fullName } = req.body;

  function hashAsync(typedPassword) {
    return new Promise(function (resolve, reject) {
      bcrypt.hash(passwd, 10, function (err, hash) {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  try {

    await client.connect();
    const db = client.db("Next-Gen");
    console.log(`BE users.js createUser connected!`);

    if (_id.length && fullName.length && type.length && passwd.length) {

      const hashResult = await hashAsync(passwd);

      if (!hashResult) {
        res.status(404).json({ status: 404, data: _id, message: `Internal error: Could not hash password` })
      } else {
        const result = await db.collection("Users").insertOne({ "_id": _id, "fullName": fullName, "type": type, "passwd": hashResult });

        result.insertedId
          ? res.status(201).json({ status: 201, data: _id, message: `User ${_id} created` })
          : res.status(404).json({ status: 404, data: req.body, message: `Missing informations` });
      };
    } else {
      res.status(404).json({ status: 404, data: req.body, message: `Missing informations` });
    }

  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      // duplicate key
      res.status(404).json({ status: 404, data: _id, message: `Identifiant ${_id} already exists!` })
    } else {
      res.status(500).json({ status: 500, data: req.body, message: error });
    }

  } finally {
    client.close();
    console.log(`BE handlers.js createUser disconnected!`);
  }

}

module.exports = { getUserById, getOrCreateUser };
