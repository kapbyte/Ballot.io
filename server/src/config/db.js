const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB and start server
module.exports = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`);
    
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}; 
