'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class word_level_join extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  word_level_join.init({
    level_id: DataTypes.INTEGER,
    word_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'word_level_join',
  });
  return word_level_join;
};