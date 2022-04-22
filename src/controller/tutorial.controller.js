const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;//process.env.SALT_ROUNDS;
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
      .then(() => {
        const newToken = createToken(login);
        const user = jwt.verify(newToken, privateKey);
        res.send({ newToken, user });
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
