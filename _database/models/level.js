'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.module, {
      	foreignKey : 'module_id'
      });
      this.hasMany(models.level_completeness, {
      	foreignKey : 'level_id'
      });
    }
    
  }
  level.init({
    module_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'modules',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'level',
  });
  
  return level;
  
};