const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Meowmeowbeenz extends Model {}

sequelize.define('Meowmeowbeenz', {
  total: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    isAlphanumeric: true,
    unique: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'meowmeowbeenz'
  });

module.exports = Meowmeowbeenz