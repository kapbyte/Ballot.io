const router = require('express').Router();

// Import controllers
const { 
  welcomeController,
  registerController, 
  emailVerificationController, 
  loginController,
  forgotPasswordController,
  resetPasswordController
} = require('../controllers/auth.controller');

router.get('/welcome', welcomeController);
router.post('/register', registerController);
router.post('/activate', emailVerificationController);
router.post('/login', loginController);

router.put('/forgot-password', forgotPasswordController);
router.put('/reset-password', resetPasswordController);

module.exports = router;