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


// Signup controller
exports.registerController = async (req, res) => {
  const { error } = validSignUpDetails.validate(req.body);
  if (error) {
    return res.status(401).json({
      status: false,
      message: error.details[0].message
    });
  }

  // Check if user is already in DB
  const userEmailExist = await User.findOne({ email: req.body.email });
  if (userEmailExist) {
    return res.status(409).json({
      status: false,
      message: "Email already exists"
    });
  }

  // Hash user password
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Generate Token
  const token = jwt.sign({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, 
  process.env.TOKEN_SECRET_KEY, 
  {
    expiresIn: '5m'
  });
  
  console.log('Token -> ', token);
  console.log(`client -> ${process.env.CLIENT_URL}`);

  const msg = {
    to: req.body.email, // Change to your recipient
    from: 'abigailchinaka@gmail.com', // Change to your verified sender
    subject: 'Account activation link',
    html: `
      <h1>Please use the following to activate your account</h1>
      <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
      <hr />
      <p>This email may containe sensetive information</p>
      <p>${process.env.CLIENT_URL}</p>
    `
  };

  try {
    await sgMail.send(msg);
    return res.send(`Email sent successfully to ${req.body.email}`);
  } catch (error) {    
    console.log(error);
    return res.send(`Something went wrong. Please contact us noreply@gmail.com`);
  }
};


// Email verification
exports.emailVerificationController = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err) => {
      if (err) {
        return res.status(407).json({
          status: false,
          message: "Expired token. Signup again"
        });
      } else {
        const { name, email, password } = jwt.decode(token);

        // Create new user and save to MongoDB
        const user = new User({ name, email, password });

        user.save((err, user) => {
          if (err) {
            return res.status(501).json({
              status: false,
              message: "Internal server error"
            });
          } else {
            return res.status(200).json({
              status: true,
              _id: user._id,
              message: "Registration successful"
            });
          }
        });
        
      }
    });
  } else {
    return res.status(408).json({
      status: false,
      message: "Something went wrong"
    });
  }
};

exports.verifyTokenController = (req, res, next) => {
  const token = req.body.token;
  console.log(">>",token);
  
  if (!token) {
    return res.status(401).json({
      status: false,
      message: 'No token provided. Access denied!'
    });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    console.log("->> ", verified);
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
      status: false,
      message: error.details[0].message
    });
  }

  // Check if user is already in MongoDB
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({
      status: false,
      message: "Email does not exists"
    });
  }

  // Confirm password
  // const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (req.body.password != user.password) {
    return res.status(401).json({
      status: false,
      message: "Invalid password"
    });
  }
  
  // Generate a token and send to client
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_KEY, { expiresIn: '5m' });

  const { _id, name, email } = user;
  
  return res.json({ 
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
      status: false,
      message: error.details[0].message
    });
  } else {
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'User with that email does not exist'
        });
      }

      const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: '5m' });
      console.log("reset -> ", token);

      const msg = {
        from: 'abigailchinaka@gmail.com',
        to: email,
        subject: `Password forgot link`,
        html: `
          <h1>Please use the following link to reset your password</h1>
          <p>${process.env.CLIENT_URL}/auth/reset-password/${token}</p>
        `
      };

      return user.updateOne({ resetPasswordLink: token }, (err) => {
        if (err) {
          console.log('RESET PASSWORD LINK ERROR', err);
          return res.status(501).json({
            status: false,
            error: 'Database connection error on user password forgot request'
          });
        } else {
            sgMail.send(msg)
              .then(() => {
                // console.log('SIGNUP EMAIL SENT', sent)
                return res.json({
                  message: `Email has been sent to ${email}. Follow the instruction to activate your account.`
                });
              })
              .catch(err => {
                // console.log('SIGNUP EMAIL SENT ERROR', err)
                console.log(err);
                return res.json({
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
      status: false,
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
          status: false,
          message: "Expired token. Signup again"
        });
      } else {

        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(401).json({
              status: false,
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
              message: `Your password has been changed.`
            });
          });
        });
      }
    });
  }
}
