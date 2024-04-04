const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');// Suponiendo que tienes configurada la instancia de Sequelize

const SpecialPrice = sequelize.define('specialPrice', {

  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  startDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endDate: {
    type: DataTypes.STRING,
    allowNull: true
  }

});

module.exports = SpecialPrice;
