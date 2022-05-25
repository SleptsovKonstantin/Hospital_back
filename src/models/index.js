require("dotenv").config();

const { DB_HOST, LOCAL_PORT} = process.env;

const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: DB_HOST, //'localhost'   'postgresNew', 'konstantinslepcovNew', 'user'
  dialect: dbConfig.dialect,
  port: Number(LOCAL_PORT),
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.records = require("./record.model.js")(sequelize, Sequelize);

module.exports = db;
