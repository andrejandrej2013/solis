'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(module, {
      	foreignKey : 'prev_module_id'
      });
      this.belongsTo(module, {
      	foreignKey : 'prev_module_id'
      });
      this.hasOne(module, {
      	foreignKey : 'next_module_id'
      });
      this.belongsTo(module, {
      	foreignKey : 'next_module_id'
      });
      this.hasMany(models.level, {
      	foreignKey : 'module_id'
      });
    }
  }
  module.init({
    prev_module_id: DataTypes.INTEGER,
    next_module_id: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'module',
  });
  return module;
};