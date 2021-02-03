const express = require('express');
const port = process.env.PORT || 8080;
require('dotenv').config({ path: './src/.env' }); // Config dotenv

const app = express();

// Imports
const middlewareSetup = require('./src/middleware/middleware');
const connectToDB = require('./src/config/db');
const authRouter = require('./src/routes/auth.route');
const userRouter = require('./src/routes/user.route');
const { verifyTokenController } = require('./src/controllers/auth.controller'); // Token verification

// Middlewares
middlewareSetup(app);

app.get('/', (req, res) => {
  return res.status(200).json({ 
    success: true, 
    message: `Ballot.io server up and running on port ${port}!!!` 
  });
});

// Use routes
app.use('/auth', authRouter);
// app.use('/user', userRouter);
app.use('/user', verifyTokenController, userRouter);

// Connect to MongoDB and start server
if (process.env.NODE_ENV !== 'test') {
  connectToDB(app);
}


// For testing
module.exports = app;