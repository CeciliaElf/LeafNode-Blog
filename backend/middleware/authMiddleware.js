const jwt = require('jsonwebtoken');

// - next: 一個函式，當前中介軟體處理完畢後，呼叫 next() 會將控制權轉交給下一個中介軟體或最終的路由處理器。
//        如果沒有呼叫 next()，且沒有發送回應，請求將會掛起。
const authMiddleWare = (req, res, next) => {
  // 從請求頭獲取 token
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(400).json({ message: '未提供認證令牌' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 驗證 token
    // 如果驗證成功，jwt.verify() 會返回 JWT 中包含的「酬載 (payload)」物件。
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'leafnode-secret-key');
    // 將用戶資訊添加到請求對象
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: '無效的認證令牌' });
  }
};

module.exports.authMiddleWare = authMiddleWare;
