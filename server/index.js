const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 8080;

const app = express();

// Imports
const middlewareSetup = require('./src/middleware/middleware');
const connectToDB = require('./src/config/db');
const authRouter = require('./src/routes/auth.route');
const userRouter = require('./src/routes/user.route');

// Middlewares
middlewareSetup(app);

// Use routes
app.use('/auth', authRouter);
app.use('/user', userRouter);

// Connect to MongoDB and start server
connectToDB();

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`));