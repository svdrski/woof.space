const mongoose = require('mongoose');


  const connectToDb = async () => {
    try {
      await mongoose.connect(process.env.DB_LINK);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };
  
  const getDb = () => mongoose.connection;
  
  module.exports = { connectToDb, getDb };
  


