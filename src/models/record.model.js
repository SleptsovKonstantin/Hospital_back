module.exports = (sequelize, Sequelize) => {
  const Record = sequelize.define("records", {
    name: {
      type: Sequelize.STRING, 
    },
    doctor: {
      type: Sequelize.STRING,
    },
    data: {
      type: Sequelize.STRING,
      // type: Sequelize.DATE
    },    
    complaint: {
      type: Sequelize.STRING,
    }
  });

  return Record;
};