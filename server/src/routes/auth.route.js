const router = require('express').Router();

// Import controllers
const { 
  registerController, 
  emailVerificationController, 
  loginController,
  forgotPasswordController,
  resetPasswordController
} = require('../controllers/auth.controller');

router.post('/register', registerController);
router.post('/activate', emailVerificationController);
router.post('/login', loginController);

router.put('/forgot-password', forgotPasswordController);
router.put('/reset-password', resetPasswordController);

module.exports = router;