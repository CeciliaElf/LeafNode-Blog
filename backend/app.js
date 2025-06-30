require('dotenv').config({ path: '.env.development' });
const sequelize = require('./config/database');
const { isLinked } = require('./config/database');

const express = require('express');
// const bodyParser = require("body-parser");  // 用於處理 Http 請求體
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const tagRoutes = require('./routes/tags');
const fileRoutes = require('./routes/file');

const app = express();

// 中間件
app.use(express.urlencoded({ extended: false })); // 解析 post body x-www-form-urlencoded 格式數據
app.use(express.json()); // 解析 post body json 格式數據
app.use(cors());
app.use('/tempFiles', express.static(path.join(__dirname, 'tempFiles'))); // 提供靜態檔案訪問

// 路由
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
app.use('/tags', tagRoutes);
app.use('/upload', fileRoutes);

const port = (() => {
  const envPort = parseInt(process.env.PORT);
  return isNaN(envPort) ? 3000 : envPort;
})();

// 啟動伺服器時，先測試資料庫練劍
const startServer = async () => {
  const connected = await isLinked();
  if (connected) {
    console.log('資料庫已經連接成功，可以繼續操作');
    sequelize
      .sync()
      .then(() => {
        app.listen(port, () => {
          console.log(`伺服器在端口 ${port} 上運行...`);
        });
      })
      .catch(err => {
        console.error('啟動失敗:', err);
      });
  } else {
    console.error('資料庫連接失敗，無法啟動伺服器。');
    throw new Error('資料庫連接失敗，無法啟動伺服器。');
  }
};

(async () => {
  // 使用 IIFE (Immediately Invoked Function Expression) 來包裹
  try {
    await startServer();
  } catch (error) {
    console.error('伺服器啟動失敗，原因：', error.message);
    throw new Error('伺服器啟動失敗。');
  }
})();
