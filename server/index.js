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

// app.get('/', (req, res) => {
//   res.send(`Ballot.io server up and running on port ${port}...`);
// });

app.get("/", (req, res) => {
  res.json({ status: "success", message: "Welcome To Testing API" });
});

app.post("/add", (req, res) => {
  const { num1, num2 } = req.body;
  const add = (num1, num2) => {
    return num1 + num2;
  };
  res.json({
    status: "success",
    result: "Welcome To Testing API",
    result: add(num1, num2)
  });
});

// Use routes
// app.use('/auth', authRouter);
// app.use('/user', userRouter);

// Connect to MongoDB and start server
connectToDB(app);