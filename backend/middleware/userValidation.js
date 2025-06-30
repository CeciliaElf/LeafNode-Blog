const { body, oneOf } = require('express-validator');

// 註冊校驗
const registerValidationRules = () => {
  return [
    // username 校驗
    body('username')
      .notEmpty()
      .withMessage('用戶名不能為空')
      .isLength({ min: 3, max: 20 })
      .withMessage('用戶名長度必須在3到20之間')
      .trim(),

    // email 校驗
    body('email')
      .notEmpty()
      .withMessage('電子郵箱不能為空')
      .isEmail()
      .withMessage('電子郵箱格式不正確')
      .normalizeEmail(), // 規範化電子郵箱地址

    // password 校驗
    body('password')
      .notEmpty()
      .withMessage('密碼不能為空')
      .isLength({ min: 6, max: 20 })
      .withMessage('密碼長度必須在 6 ~ 20 個字符之間')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
      .withMessage('密碼必須包含大小寫字母、數字和特殊字符'),

    // nickname 驗證
    body('nickname')
      .notEmpty()
      .withMessage('暱稱不能為空')
      .isLength({ min: 2, max: 15 })
      .withMessage('暱稱長度必須在2到15個字符之間')
      .trim(),

    // age 驗證
    body('age')
      .notEmpty()
      .withMessage('年齡不能為空')
      .isInt({ min: 1, max: 135 })
      .withMessage('年齡必須是1到135之間的整數'),

    // gender 驗證 (假設 0 或 1)
    body('gender')
      .notEmpty()
      .withMessage('性別不能為空')
      // 使用 isIn 方法，傳入 ENUM 允許值列表
      .isIn(['male', 'female', 'MTF', 'FTM', 'other'])
      .withMessage('請您填寫性別： 男, 女, MTF, FTM 或 其他 中的一個'),

    // introduction (可選，如果存在則驗證長度)
    body('introduction')
      .optional() // 表示這個字段是可選的，如果不存在就不進行後續驗證
      .isLength({ max: 500 })
      .withMessage('簡介長度不能超過500個字符')
      .trim(),

    // avatar (可選，如果存在則驗證格式或URL)
    body('avatar')
      .optional()
      .isURL()
      .withMessage('大頭貼URL格式不正確') // 存儲的是URL
      .trim(),
  ];
};

// 登入校驗
const loginValidationRules = () => {
  return [
    // 確保 password 存在且不為空
    body('password').notEmpty().withMessage('密碼不能為空'),

    // 確保 username 或 email 至少有一個存在且不為空
    oneOf(
      [
        body('username').notEmpty().withMessage('用戶名不能為空'),
        body('email')
          .notEmpty()
          .withMessage('電子郵箱不能為空')
          .isEmail()
          .withMessage('電子郵箱格式不正確'),
      ],
      '請提供用戶名或電子郵箱'
    ), // oneOf 的第二個參數是當所有條件都不滿足時的錯誤訊息
  ];
};

module.exports = { registerValidationRules, loginValidationRules };
