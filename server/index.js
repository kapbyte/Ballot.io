const express = require('express');
const port = process.env.PORT || 8080;

// Config dotenv
// require('dotenv').config({ path: './src/config/config.env' });
require('dotenv').config({ path: './src/.env' });

const app = express();

// Imports
const middlewareSetup = require('./src/middleware/middleware');
const connectToDB = require('./src/config/db');
const authRouter = require('./src/routes/auth.route');
const userRouter = require('./src/routes/user.route');

// Middlewares
middlewareSetup(app);

app.get('/', (req, res) => {
  res.send(`Ballot.io server up and running on port ${port}...`);
});

// Use routes
app.use('/auth', authRouter);
app.use('/user', userRouter);

// Connect to MongoDB and start server
connectToDB(app);