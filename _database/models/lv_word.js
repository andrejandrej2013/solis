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
      this.belongsTo(models.part_of_speech, {
        foreignKey : 'part_of_speech_id'
      });
      this.hasMany(models.en_lv_join, {
        foreignKey : 'lv_id'
      });
      this.hasOne(models.noun, {
        foreignKey : 'word_id'
      });
      this.hasOne(models.verb, {
        foreignKey : 'word_id'
      });
      this.hasOne(models.adjective, {
        foreignKey : 'word_id'
      });
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