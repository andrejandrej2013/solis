'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.room,{
        foreignKey : 'room_id'
      });
      this.belongsTo(models.user,{
        foreignKey : 'user_id'
      });
      
    }
  }
  message.init({
    user_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};