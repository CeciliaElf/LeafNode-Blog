const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// 創建新的部落格
router.post('/', blogController.createBlog);

// 查詢部落格列表
router.get('/', blogController.getBlogList);

// 根據 Id 查詢
router.get('/:id', blogController.getBlogById);

// 根據標題查詢
router.get('/:title', blogController.getBlogByTitle);

// 根據內容查詢
router.get('/:content', blogController.getBlogByContent);

// 根據 Id 修改
router.patch('/:id', blogController.updateBlogById);

// 根據 Id 刪除
router.delete('/delete/:id', blogController.deleteBlogById);

module.exports = router;
