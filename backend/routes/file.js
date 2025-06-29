const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

// 上傳檔案
router.post('/file', fileController.uploadFile);

module.exports = router;
