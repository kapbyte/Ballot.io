const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 8080;

// Connect to MongoDB and start server
module.exports = async (app) => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    app.listen(port, () => console.log(`Server listening on port ${port}`));
    console.log(`MongoDB Connected: ${connection.connection.host}`);

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}; 
