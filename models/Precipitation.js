const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Precipitation = sequelize.define('precipitation', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Xref: {
      type: Sequelize.INTEGER,
    },
    Yref: {
      type: Sequelize.INTEGER,
    },
    Date: {
      type: Sequelize.STRING,
    },
    Value: {
      type: Sequelize.INTEGER,
    }
  }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  });

  return Precipitation;
};
