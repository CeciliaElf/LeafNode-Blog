// 資料庫配置
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'leafnode_blog_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
  }
);

const isLinked = async () => {
  try {
    await sequelize.authenticate();
    console.log('已成功建立連接');
    return true;
  } catch (error) {
    console.error('無法連接到資料庫:', error);
    return false;
  }
};

module.exports = sequelize;
module.exports.isLinked = isLinked;
