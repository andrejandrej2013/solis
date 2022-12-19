'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class level_completeness extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  level_completeness.init({
    user_id: DataTypes.INTEGER,
    level_id: DataTypes.INTEGER,
    completeness: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'level_completeness',
  });
  return level_completeness;
};