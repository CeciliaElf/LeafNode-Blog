const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Tag extends Model {}

Tag.init(
  {
    name: {
      comment: '標籤名稱',
      type: DataTypes.STRING(20),
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
    tableName: 'tags',
  }
);

module.exports = Tag;
