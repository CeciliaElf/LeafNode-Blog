module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修復錯誤
        'docs', // 文件變更
        'style', // 程式碼格式（不影響功能）
        'refactor', // 重構
        'perf', // 效能優化
        'test', // 新增或修改測試
        'chore', // 建置流程或輔助工具的變動
        'ci', // CI 相關變更
        'revert', // 還原先前的提交
      ],
    ],
    'subject-case': [0], // 允許任何類型的主題格式
  },
};
