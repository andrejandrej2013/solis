'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class noun extends Model {
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
  noun.init({
    deklinacija_id: DataTypes.INTEGER,
    skaitlis_id: DataTypes.INTEGER,
    word_id: DataTypes.INTEGER,
    nominativs: DataTypes.STRING,
    genitivs: DataTypes.STRING,
    akuzativs: DataTypes.STRING,
    instrumentalis: DataTypes.STRING,
    lokativs: DataTypes.STRING,
    vokativs: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'noun',
  });
  return noun;
};