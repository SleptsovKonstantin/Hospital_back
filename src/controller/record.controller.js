const db = require("../models");

const Record = db.records;

exports.createRecord = (req, res) => {
    console.log("STAAAAAAART<<<<<>>>>>>>");
    const { name, doctor, data, complaint } = req.body;
    if (name && doctor && data && complaint) {
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
                res
                    .status(400)
                    .send({ message: `id is not in the database-----${err}` });
            });
    } else {
        res.send({
            message: `Create new task was failing, because body is empty. Please check the data you send.`,
        });
    }
};

exports.findAllRecord = (req, res) => {
    Record.findAll({
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
    const { id } = body;
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

exports.deleteOneRecord = (req, res) => {
    const { id } = req.query;
    Record.destroy({ where: { id } })
        .then(() => {
            Record.findAll({
                order: ["id"],
            })
                .then((data) => {
                    res.send(data);
                })
        })
        .catch((err) => {
            res.send({ message: `Error.you need to enter a number` });
        });
};

exports.sortRecords = (req, res) => {
    const body = req.body;
    console.log("body=======>", req.body);
    const field = Object.keys(body).length != 0 ? Object.keys(body) : ["id"];
    body[field] ? field.push(body[field]) : field.push("ASC");
    Record.findAll({
        order: [field],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(400).send({
                message: `Error. 
        invalid ASC or DESC specified => ${err}`,
            });
        });
};
const { Op } = require("sequelize");

exports.filterRecords = (req, res) => {
    const body = req.query;
    // if (
    //     body.hasOwnProperty("id") ||
    //     body.hasOwnProperty("name") ||
    //     body.hasOwnProperty("doctor") ||
    //     body.hasOwnProperty("data") ||
    //     body.hasOwnProperty("complaint")
    //     // body 
    // ) {
        // Record.findAll({ where: body})
        Record.findAll({ where: { [Op.lte]: { data: "2022 - 04 - 19" } } })
            .then((data) => {
                if (data.length !== 0) {
                    res.send(data);
                } else {
                    res.send({ message: `Error. invalid  value` });
                }
            })
            .catch((err) => {
                res.status(400).send({ message: `invalid key. Error => ${err}` });
            });
    // } else {
    //     res.status(400).send({ message: `Error. you didn't send data` });
    // }
};