'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user,{
        foreignKey : 'user_id'
      })
    }
  }
  user_word.init({
    user_id: DataTypes.INTEGER,
    en_word: DataTypes.STRING,
    lv_word: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_word',
  });
  return user_word;
};