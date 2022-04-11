const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT_ROUNDS;
const jwt = require("jsonwebtoken");
const privateKey = process.env.SECRET_KEY;

const User = db.tutorials;

const createToken = (logChange) => {
  const token = jwt.sign({ logChange }, privateKey, { expiresIn: "24h" });
  return token;
};

exports.create = async (req, res) => {
  const { login, password } = req.body;
  const hash = bcrypt.hashSync(password, saltRounds);
  if (login && password) {
    const newUser = {
      login,
      password: hash,
    };
    User.create(newUser)
      .then((data) => {
        const newToken = createToken(login);
        res.send({ newToken });
      })
      .catch((err) => {
        res.status(400).send({ message: `invalid key ${err}` });
      });
  } else {
    res.send({
      message: `Create new task was failing, because body is empty. Please check the data you send.`,
    });
  }
};

exports.login = async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ where: { login } });
  if (user !== null) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const newToken = createToken(login);
        console.log(newToken);
        res.send({ newToken });
      } else {
        console.log(result);
        res.send(result);
      }
    });
  } else {
    console.log(user);
    res.send( {user} )
  }
};

exports.findAll = (req, res) => {
  User.findAll({
    order: ["id"],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({ message: `id is not in the database` });
    });
};

exports.deleteOne = (req, res) => {
  const { id } = req.query;
  User.destroy({ where: { id } })
    .then(() => {
      res.send(`удалено`);
    })
    .catch((err) => {
      res.send({ message: `Error.you need to enter a number` });
    });
};
