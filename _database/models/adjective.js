'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class adjective extends Model {
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
  adjective.init({
    skaitlis_id: DataTypes.INTEGER,
    dzimte_id: DataTypes.INTEGER,
    nenot_g_id: DataTypes.INTEGER,
    word_id: DataTypes.INTEGER,
    nominativs: DataTypes.STRING,
    genitivs: DataTypes.STRING,
    dativs: DataTypes.STRING,
    akuzativs: DataTypes.STRING,
    instrumentalis: DataTypes.STRING,
    lokativs: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'adjective',
  });
  return adjective;
};