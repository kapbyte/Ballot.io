const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { 
  validSignUpDetails, 
  validLoginDetails, 
  forgotPasswordDetails,
  resetPasswordDetails
} = require('../helpers/inputChecker');


// Welcome controller
exports.welcomeController = (req, res) => {
  return res.json({ 
    success: true, 
    message: `Welcome to auth services` 
  });
}


// Signup controller
exports.registerController = async (req, res) => {
  const { error } = validSignUpDetails.validate(req.body);
  if (error) {
    return res.status(401).json({
      success: false,
      message: error.details[0].message
    });
  }

  // Check if user is already in DB
  const userEmailExist = await User.findOne({ email: req.body.email });
  if (userEmailExist) {
    return res.status(404).json({
      success: false,
      message: "Email already exists!"
    });
  }

  // Hash user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Generate Token
  const token = jwt.sign({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  }, 
  process.env.TOKEN_SECRET_KEY, 
  {
    expiresIn: '5m'
  });
  
  console.log('Token -> ', token);

  const msg = {
    to: req.body.email,
    from: process.env.SENDGRID_from, 
    subject: 'Account activation link',
    html: `
      <h3>Welcome to Ballot.io</h3>
      <p>Please click on the link to activate your account</p>
      <a href="${process.env.CLIENT_URL}/auth/activate/${token}">Activate your account</a>
      <hr />
    `
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ 
      success: true, 
      message: `Email sent successfully to ${req.body.email}` 
    });
  } catch (error) {    
    console.log(error);
    return res.status(501).json({
      success: false,
      message: `Something went wrong. Please contact us noreply@gmail.com` 
    });
  }
};


// Email verification
exports.emailVerificationController = (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err) => {
      if (err) {
        return res.status(407).json({
          success: false,
          message: "Expired token. Signup again"
        });
      } else {
        const { name, email, password } = jwt.decode(token);

        // Create new user and save to MongoDB
        const user = new User({ 
          name, 
          email, 
          password,
          totalPollCreated: 0
        });

        user.save((err, user) => {
          if (err) {
            return res.status(501).json({
              success: false,
              message: "Internal server error"
            });
          } else {
            console.log("saved user -> ", user);
            return res.status(200).json({
              success: true,
              _id: user._id,
              message: "Registration successful"
            });
          }
        });
      }
    });
  } else {
    return res.status(408).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

exports.verifyTokenController = (req, res, next) => {
  const token = (req.headers.authorization).split(' ')[1];
  console.log('token -> ', token);
  
  if (!token) {
    return res.status(401).json({
      status: false,
      message: 'No token provided. Access denied!'
    });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    console.log("verified -> ", verified);
    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: 'Invalid token!'
    });
  }
}


// Login controller
exports.loginController = async (req, res) => {
  const { error } = validLoginDetails.validate(req.body);
  if (error) {
    return res.status(401).json({
      success: false,
      message: error.details[0].message
    });
  }

  // Check if user is already in MongoDB
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Email does not exists"
    });
  }

  // Confirm password
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "Invalid password"
    });
  }
  
  // Generate a token and send to client
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_KEY, { expiresIn: '120m' });
  const { _id, name, email } = user;
  
  return res.send({ 
    success: true,
    token,
    user: { _id, name, email } 
  });
};


// Forgot password controller
exports.forgotPasswordController = (req, res) => {
  const { email } = req.body;
  const { error } = forgotPasswordDetails.validate(req.body);

  if (error) {
    return res.status(401).json({
      success: false,
      message: error.details[0].message
    });
  } else {
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          success: false,
          message: 'User with that email does not exist'
        });
      }

      const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: '5m' });
      console.log("reset -> ", token);

      const msg = {
        from: process.env.SENDGRID_from,
        to: email,
        subject: `Password forgot link`,
        html: `
          <p>Please use the following link to reset your password</p>
          <a href="${process.env.CLIENT_URL}/auth/reset-password/${token}">Create new password</a>
          <hr />
        `
      };

      return user.updateOne({ resetPasswordLink: token }, (err) => {
        if (err) {
          console.log('RESET PASSWORD LINK ERROR', err);
          return res.status(501).json({
            success: false,
            message: 'Database connection error on user password forgot request'
          });
        } else {
            sgMail.send(msg)
              .then(() => {
                // console.log('SIGNUP EMAIL SENT', sent)
                return res.json({
                  success: true,
                  message: `Email has been sent to ${email}. Follow the instruction to set a new password.`
                });
              })
              .catch(err => {
                // console.log('SIGNUP EMAIL SENT ERROR', err)
                console.log(err);
                return res.json({
                  success: false,
                  message: err.message
                });
              }
            );
          }
      });
    });
  }
};


// Reset password controller
exports.resetPasswordController = (req, res) => {
  const { error } = resetPasswordDetails.validate(req.body);
  if (error) {
    return res.status(401).json({
      success: false,
      message: error.details[0].message
    });
  }
  console.log(req.body);
  const { newPassword, resetPasswordLink } = req.body;

  if (!resetPasswordLink) {
    return res.status(401).json({
      error: 'Authentication error, provide reset token!!'
    });
  } else {
    jwt.verify(resetPasswordLink, process.env.RESET_PASSWORD_KEY, (err) => {
      if (err) {
        return res.status(407).json({
          success: false,
          message: "Expired token. Signup again"
        });
      } else {

        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(401).json({
              success: false,
              message: "User with this token does not exists"
            });
          }

          const updatedFields = {
            password: newPassword,
            resetPasswordLink: ''
          };

          user = _.extend(user, updatedFields);

          user.save((err) => {
            if (err) {
              return res.status(400).json({
                error: 'Error resetting user password'
              });
            }
            res.status(200).json({
              success: true,
              message: `Your password has been changed.`
            });
          });
        });
      }
    });
  }
}
