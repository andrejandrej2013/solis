'use strict';
const {
  Model
} = require('sequelize');
// const role = require('./role');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.role, {
      	foreignKey : 'user_role_id'
      });
      this.hasMany(models.user_word,{
        foreignKey : 'user_id'
      });
      this.hasMany(models.room,{
        foreignKey : 'user_id'
      });
      this.hasMany(models.message,{
        foreignKey : 'user_id'
      });
    }
  }
  user.init({
    user_role_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthday: DataTypes.DATE,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};