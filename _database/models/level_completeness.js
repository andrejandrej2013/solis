'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class level_completeness extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.level, {
      	foreignKey : 'level_id'
      });
      this.belongsTo(models.user, {
      	foreignKey : 'user_id'
      });
    }
  }
  level_completeness.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    level_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'levels',
        key: 'id'
      }
    },
    completeness: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'level_completeness',
  });
  return level_completeness;
};