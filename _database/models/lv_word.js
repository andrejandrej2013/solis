'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lv_word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  lv_word.init({
    part_of_speech_id: DataTypes.INTEGER,
    word: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lv_word',
  });
  return lv_word;
};