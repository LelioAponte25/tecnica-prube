const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');// Suponiendo que tienes configurada la instancia de Sequelize

const SpecialPrice = sequelize.define('specialPrice', {

  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

module.exports = SpecialPrice;
