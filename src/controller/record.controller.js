const db = require("../models");

const Record = db.records;

exports.create = (req, res) => {
  console.log("STAAAAAAART<<<<<>>>>>>>");
  // const { title, description, published } = req.body;
  // if (name && description && published) {
  // const newRecord = {
  //   name: "",
  //   doctor: "",
  //   data: "",
  //   complaint: ""
  // };

  const { name, doctor, data, complaint } = req.body;
  console.log(req.body);
  const newRecord = {
    name,
    doctor,
    data,
    complaint,
  };
  Record.create(newRecord)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({ message: `id is not in the database-----${err}` });
    });
  // } else {
  //   res.send({
  //     message: `Create new task was failing, because body is empty. Please check the data you send.`,
  //   });
  // }
};

// exports.findAll = (req, res) => {
//   Record.findAll({
//     order: ["id"],
//   })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(400).send({ message: `id is not in the database` });
//     });
// };

// exports.deleteOne = (req, res) => {
//   const { id } = req.query;
//   Record.destroy({ where: { id } })
//     .then(() => {
//       res.send(`удалено`);
//     })
//     .catch((err) => {
//       res.send({ message: `Error.you need to enter a number` });
//     });
// };
