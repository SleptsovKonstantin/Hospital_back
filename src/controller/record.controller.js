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

exports.deleteOneRecord = (req, res) => {
    const { id, user } = req.query;
    Record.destroy({ where: { id } })
        .then(() => {
            Record.findAll({
                where: { user: user },
                order: ["id"],
            })
                .then((data) => {
                    res.send(data);
                })
        })
        .catch((err) => {
            res.send({ message: `Error.you need to enter a number. Error: ${err}` });
        });
};

exports.sortRecords = (req, res) => {
    const field = [];
    const { user } = req.body;

    if (req.body.hasOwnProperty("name")) {
        field.push("name");
        field.push(req.body.name);
    }

    if (req.body.hasOwnProperty("doctor")) {
        field.push("doctor");
        field.push(req.body.doctor);
    }

    if (req.body.hasOwnProperty("data")) {
        field.push("data");
        field.push(req.body.data);
    }

    if (req.body.hasOwnProperty("complaint")) {
        field.push("complaint");
        field.push(req.body.complaint);
    }

    if (req.body.hasOwnProperty("id")) {
        field.push("id");
        field.push(req.body.id);
    }

    Record.findAll({
        where: { user: user },
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

exports.filterRecords = (req, res) => {
    const body = req.body;

    const { valueInputFilterWith, valueInputFilterOn, user } = body;

    const bodyObj = {};

    if (valueInputFilterWith !== "" && valueInputFilterOn == "") {
        bodyObj[Op.gte] = valueInputFilterWith;
    }
    if (valueInputFilterWith == "" && valueInputFilterOn !== "") {
        bodyObj[Op.lte] = valueInputFilterOn;
    }
    if (valueInputFilterWith !== "" && valueInputFilterOn !== "") {
        bodyObj[Op.between] = [valueInputFilterWith, valueInputFilterOn];
    }

    Record.findAll({
        where: {
            data: bodyObj,
            user: user
        }
    })
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

};