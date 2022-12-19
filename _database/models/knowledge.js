'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class knowledge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  knowledge.init({
    module_id: DataTypes.INTEGER,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'knowledge',
  });
  return knowledge;
};