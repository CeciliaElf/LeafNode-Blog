const express = require('express');
const { registerValidationRules, loginValidationRules } = require('../middleware/userValidation');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', registerValidationRules(), authController.register);
router.post('/login', loginValidationRules(), authController.login);

module.exports = router;
