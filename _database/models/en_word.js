'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class en_word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.en_word, {
        foreignKey : 'en_id'
      });
    }
  }
  en_word.init({
    word: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'en_word',
  });
  return en_word;
};