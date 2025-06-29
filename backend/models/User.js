const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init(
  {
    username: {
      comment: '用戶名',
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      comment: '電子郵箱',
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      comment: '密碼',
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      comment: '年齡',
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    gender: {
      comment: '性別',
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    introduction: {
      comment: '簡介',
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar: {
      comment: '大頭貼',
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdTime: {
      comment: '註冊時間',
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

module.exports = User;
