const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const privateKey = "Secret_Key";

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

// exports.findTitle = (req, res) => {
//   const body = req.query;
//   if (
//     body.hasOwnProperty("id") ||
//     body.hasOwnProperty("text") ||
//     body.hasOwnProperty("age") ||
//     body.hasOwnProperty("description") ||
//     body.hasOwnProperty("owner") ||
//     body.hasOwnProperty("country") ||
//     body.hasOwnProperty("createdAt") ||
//     body.hasOwnProperty("updatedAt")
//   ) {
//     Wall.findAll({ where: body })
//       .then((data) => {
//         if (data.length !== 0) {
//           res.send(data);
//         } else {
//           res.send({ message: `Error. invalid  value` });
//         }
//       })
//       .catch((err) => {
//         res.status(400).send({ message: `Error. check key in body=> ${err} ` });
//       });
//   } else {
//     res.status(400).send({ message: `Error. you didn't send data` });
//   }
// };

// exports.filter = (req, res) => {
//   const body = req.query;
//   if (
//     body.hasOwnProperty("id") ||
//     body.hasOwnProperty("text") ||
//     body.hasOwnProperty("age") ||
//     body.hasOwnProperty("description") ||
//     body.hasOwnProperty("owner") ||
//     body.hasOwnProperty("country") ||
//     body.hasOwnProperty("createdAt") ||
//     body.hasOwnProperty("updatedAt")
//   ) {
//     Wall.findAll({ where: body })
//       .then((data) => {
//         if (data.length !== 0) {
//           res.send(data);
//         } else {
//           res.send({ message: `Error. invalid  value` });
//         }
//       })
//       .catch((err) => {
//         res.status(400).send({ message: `invalid key. Error => ${err}` });
//       });
//   } else {
//     res.status(400).send({ message: `Error. you didn't send data` });
//   }
// };

// exports.sort = (req, res) => {
//   const body = req.body;
//   const field = Object.keys(body).length != 0 ? Object.keys(body) : ["id"];
//   body[field] ? field.push(body[field]) : field.push("ASC");
//   Wall.findAll({
//     order: [field],
//   })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(400).send({
//         message: `Error.
//         invalid ASC or DESC specified => ${err}`,
//       });
//     });
// };

// exports.pagination = (req, res) => {
//   const { limit, offset } = req.query;
//   const limitVal = limit ? limit : null;
//   const offsetVal = offset ? offset : null;
//   Wall.findAndCountAll({
//     offset: offsetVal,
//     limit: limitVal,
//   })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(400).send({ message: `Error => ${err}` });
//     });
// };

// exports.paginationSort = (req, res) => {
//   const { limit, offset } = req.query;
//   const limitVal = limit ? limit : null;
//   const offsetVal = offset ? offset : null;
//   Wall.findAndCountAll({
//     offset: offsetVal,
//     limit: limitVal,
//     order: [["age", req.query.age]],
//   })
//     .then((data) => {
//       if (data.rows.length > 0) {
//         res.send(data);
//       } else {
//         res.send({ message: `Error. Not page` });
//       }
//     })
//     .catch((err) => {
//       res.status(400).send({ message: `Error => ${err}` });
//     });
// };

// exports.value = (req, res) => {
//   const body = req.body;
//   if (
//     body.includes("id") ||
//     body.includes("text") ||
//     body.includes("age") ||
//     body.includes("description") ||
//     body.includes("owner") ||
//     body.includes("country") ||
//     body.includes("createdAt") ||
//     body.includes("updatedAt")
//   ) {
//     Wall.findAll({
//       attributes: body,
//     })
//       .then((data) => {
//         res.send(data);
//       })
//       .catch((err) => {
//         res.status(400).send({ message: `Error. Check val => ${err}` });
//       });
//   } else {
//     res.status(400).send({ message: `Error. you didn't send data` });
//   }
// };
