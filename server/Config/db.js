const mongoose = require('mongoose');
const URL = 'mongodb+srv://woof:qwerty21@cluster0.iqykw3d.mongodb.net/woof?retryWrites=true&w=majority'


  
  const connectToDb = async () => {
    try {
      await mongoose.connect(URL);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };
  
  const getDb = () => mongoose.connection;
  
  module.exports = { connectToDb, getDb };
  


