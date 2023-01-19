'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class part_of_speech extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.lv_word, {
        foreignKey : 'part_of_speech_id'
      });
    }
  }
  part_of_speech.init({
    part_of_speech: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'part_of_speech',
  });
  return part_of_speech;
};