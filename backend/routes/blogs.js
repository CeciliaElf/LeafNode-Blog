const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { authMiddleWare } = require('../middleware/authMiddleware');

// 創建新的部落格
router.post('/', authMiddleWare, blogController.createBlog);

// 查詢部落格列表
router.get('/', blogController.getBlogList);

// 根據 Id 查詢
router.get('/id/:id', blogController.getBlogById);

// 根據標題查詢
router.get('title/:title', blogController.getBlogByTitle);

// 根據內容查詢
router.get('content/:content', blogController.getBlogByContent);

// 根據 Id 修改
router.patch('/:id', authMiddleWare, blogController.updateBlogById);

// 根據 Id 刪除
router.delete('/:id', authMiddleWare, blogController.deleteBlogById);

module.exports = router;
