'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasks_marks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tasks_marks.init({
    user_id: DataTypes.INTEGER,
    task_id: DataTypes.INTEGER,
    mark: DataTypes.INTEGER,
    answer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tasks_marks',
  });
  return tasks_marks;
};