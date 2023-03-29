/**
 * @description: Connect to MongoDB
 * @param {String} url - The MongoDB connection URL
 * @returns {Object} The mongoose connection object
  */


// import required modules
const mongoose = require('mongoose');

// Set strictQuery to true
mongoose.set('strictQuery', true);

// Connect to MongoDB
const connectDB = (url) => {
	return mongoose.connect(url);
}

// Export the connectDB function
module.exports = connectDB;