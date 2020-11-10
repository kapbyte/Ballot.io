const Joi = require('@hapi/joi');

// Registration input validation
exports.validSignUpDetails  = Joi.object({  
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required() 
});

// Login input validation
exports.validLoginDetails  = Joi.object({ 
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required() 
});

// Forgot password input validation
exports.forgotPasswordDetails  = Joi.object({ 
  email: Joi.string().min(6).required().email()
});

// Reset password input validation
exports.resetPasswordDetails  = Joi.object({ 
  newPassword: Joi.string().min(6).required(),
  resetPasswordLink: Joi.string().required()
});

// Create poll input validation
exports.createPollDetails  = Joi.object({
  createdBy: Joi.string().min(6).required(),
  title: Joi.string().min(6).required(),
  options: Joi.array().required().min(2).max(4)
});

// Delete poll input validaton
exports.deletePollDetail = Joi.object({
  createdBy: Joi.string().min(6).required(),
});

// Vote input validaton
exports.pollVoteDetail = Joi.object({
  ip: Joi.string().required(),
  selectedIndex: Joi.number().integer().min(0).max(3).required()
});