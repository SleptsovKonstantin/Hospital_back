const db = require("../models");
const { Op } = require("sequelize");

const Record = db.records;

exports.createRecord = (req, res) => {
    const { name, doctor, data, complaint, user } = req.body;
    if (name && doctor && data && complaint && user) {
        const newRecord = {
            name,
            doctor,
            data,
            complaint,
            user
        };
        Record.create(newRecord)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res
                    .status(400)
                    .send({ message: `${err}` });
            });
    } else {
        res.send({
            message: `Create new task was failing, because body is empty. Please check the data you send.`,
        });
    }
};

exports.findAllRecord = (req, res) => {
    const { login } = req.query;
    Record.findAll({
        where: { user: login },
        order: ["id"],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(400).send({ message: `id is not in the database ${err}` });
        });
};

exports.updateRecord = (req, res) => {
    const body = req.body;
    const { id, user } = body;
    if (
        id &&
        (body.hasOwnProperty("name") ||
            body.hasOwnProperty("doctor") ||
            body.hasOwnProperty("data") ||
            body.hasOwnProperty("complaint"))
    ) {
        Record.update(body, { where: { id } }).then((result) => {
            if (result == 1) {
                Record.findAll({
                    where: { user: user },
                    order: [
                        ["id"]
                    ],
                })
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((err) => {
                        res.send({ message: `Error` });
                    });
            } else {
                res.send({
                    message: `id=${id} not found in database. Check if id is correct`,
                });
            }
        });
    } else {
        res.send({
            message: `id=${id} is empty.`,
        });
    }
};