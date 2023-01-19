'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class verb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.lv_word, {
        foreignKey : 'word_id'
      });
    }
  }
  verb.init({
    laiks_id: DataTypes.INTEGER,
    skaitlis_id: DataTypes.INTEGER,
    word_id: DataTypes.INTEGER,
    first_form: DataTypes.STRING,
    second_form: DataTypes.STRING,
    third_form: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'verb',
  });
  return verb;
};