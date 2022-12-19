'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class en_lv_join extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  en_lv_join.init({
    lv_id: DataTypes.INTEGER,
    en_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'en_lv_join',
  });
  return en_lv_join;
};