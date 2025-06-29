const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

// 創建標籤
router.post('/', tagController.createTag);

// 獲取所有標籤
router.get('/', tagController.getTags);

// 修改標籤
router.patch('/:id', tagController.updateTagById);

// 根據 Id 刪除
router.delete('/:id', tagController.deleteTag);

module.exports = router;
