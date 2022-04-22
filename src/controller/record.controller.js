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
