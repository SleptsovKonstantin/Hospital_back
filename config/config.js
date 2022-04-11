require("dotenv").config();

const { DB_HOST, DB_USER, DB_PASSWORD } = process.env;

module.exports = {
  "development": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": "database_development",
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": "database_test",
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": "database_production",
    "host": DB_HOST,
    "dialect": "postgres"
  }
}
