const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init(
  {
    username: {
      comment: '用戶名',
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    email: {
      comment: '電子郵箱',
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      comment: '密碼',
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nickname: {
      comment: '暱稱',
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    age: {
      comment: '年齡',
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    gender: {
      comment: '性別',
      type: DataTypes.ENUM('male', 'female', 'MTF', 'FTM', 'other'),
      allowNull: false,
    },
    introduction: {
      comment: '用戶個人簡介',
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar: {
      comment: '大頭貼',
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

module.exports = User;
