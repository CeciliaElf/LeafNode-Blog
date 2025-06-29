const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

const User = require('../models/User');
const Tag = require('../models/Tag');

class Blog extends Model {}

Blog.init(
  {
    title: {
      comment: '標題',
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      comment: '部落格內容',
      type: DataTypes.STRING,
      allowNull: false,
    },
    coverImg: {
      comment: '封面圖片',
      type: DataTypes.STRING,
      allowNull: true,
    },
    isDelete: {
      comment: '是否已經刪除',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Blog',
  }
);

// 一篇文章可以對應多個標籤，一個標籤也可以對應多個文章
// 部落格和標籤的關係
Blog.belongsToMany(Tag, {
  through: 'Blog_Tag',
  as: 'tags', // 代表從 Blog 獲取到的 Tag 集合
});

// 部落格和用戶之間的關係
Blog.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Blog, { foreignKey: 'userId', as: 'user' });
module.exports = Blog;
