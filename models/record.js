'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Record.init({
    name: DataTypes.STRING,
    doctor: DataTypes.STRING,
    data: DataTypes.STRING,
    complaint: DataTypes.STRING,
    user: DataTypes.STRING
  }, 
  {
    sequelize,
    modelName: 'Record',
  });
  return Record;
};