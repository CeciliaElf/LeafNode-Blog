const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Tag extends Model {}

Tag.init(
  {
    name: {
      comment: '標籤名稱',
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isDeleted: {
      comment: '是否已經刪除',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Tag',
  }
);

module.exports = Tag;
