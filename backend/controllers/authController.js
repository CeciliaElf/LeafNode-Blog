const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'leafnode-secret-key';
// 註冊 req 輸入  res 輸出
// - req: 請求物件，包含客戶端發送的所有資訊（例如請求頭、請求體、查詢參數等）。
// - res: 回應物件，用於向客戶端發送回應（例如設定狀態碼、發送 JSON 資料等）。
const register = async (req, res) => {
  // 驗證結果
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, nickname, age, gender } = req.body;
  try {
    // 如果存在重複用戶
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });
    if (existingUser) {
      return res.status(400).json({ message: '該用戶名/電子郵箱已經被註冊過了' });
    }
    // 密碼加密處理
    const hashedPassword = await bcrypt.hash(password, 10);
    const registerDate = new Date();
    // 創建用戶
    await User.create({
      username,
      email,
      password: hashedPassword,
      nickname,
      age,
      gender,
      createdTime: registerDate,
    });
    res.status(201).json({ message: '用戶註冊成功' });
  } catch (error) {
    res.status(500).json({ message: '遇到網路問題，註冊失敗，請稍後重試' });
  }
};

// 登入
const login = async (req, res) => {
  const { username, email, password } = req.body;
  // 檢查用戶是否存在
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          // 只有當 username 存在時才加入查詢條件
          username ? { username: username } : undefined,
          // 只有當 email 存在時才加入查詢條件
          email ? { email: email } : undefined,
        ].filter(Boolean), // 過濾掉 undefined，確保 Op.or 的數組不包含空值
      },
    });
    if (!user) {
      return res.status(401).json({ message: '用戶名/電子郵箱或密碼錯誤' });
    }

    // 看密碼是否匹配，驗證密碼
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: '用戶名/電子郵箱或密碼錯誤' });
    }

    // 登入成功，生成 JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email }, // payload，包含用戶識別信息
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 返回成功響應和 JWT
    return res.status(200).json({
      message: '登錄成功',
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        nickname: user.nickname,
      },
    });
  } catch (error) {
    res.status(500).json({ message: '網路環境錯誤，請稍後再試' });
  }
};

module.exports = {
  register,
  login,
};
