const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

const User = require('../models/User');
const Tag = require('../models/Tag');

class Blog extends Model {}

Blog.init(
  {
    title: {
      comment: '標題',
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    content: {
      comment: '部落格內容',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    coverImg: {
      comment: '封面圖片',
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    category: {
      comment: '所屬專欄',
      type: DataTypes.STRING(64),
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
    tableName: 'blogs',
    timestamps: true, // 添加 createdAt 和 updatedAt 欄位
  }
);

// 一篇文章可以對應多個標籤，一個標籤也可以對應多個文章
// 部落格和標籤的關係
Blog.belongsToMany(Tag, {
  through: 'blog_tags',
  as: 'tags', // 代表從 Blog 獲取到的 Tag 集合，一個 Blog 可以對應多個標籤
  foreignKey: 'blogId',
  otherKey: 'tagId',
});

Tag.belongsToMany(Blog, {
  through: 'blog_tags',
  as: 'blogs',
  foreignKey: 'tagId',
  otherKey: 'blogId',
});

// 部落格和用戶之間的關係
Blog.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // 一篇 blog 只屬於一個 user
User.hasMany(Blog, { foreignKey: 'userId', as: 'blogs' }); // 一個 user 可以有多個 blogs
module.exports = Blog;
