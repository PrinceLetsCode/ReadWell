/**
 * @description - This is the entry point of the application
 * @requires express - The express module
 * @requires dotenv - The dotenv module
 * @requires connectDB - The connectDB module
 * @requires routes - The routes module
  */


// import required modules
const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('../DB/connectDB');
const routes = require('../routes/routes');


// Middlewares

// Body parser
app.use(express.json());

//  Routes
app.use('/api/v1', routes);



// port
PORT = process.env.PORT || 5000

// server starts only after the database connection is established
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(process.env.PORT, () => {
			console.log(`server running on port ${process.env.PORT}...`);
		})
	} catch (error) {
		console.log(error);
	}
}

// 	Start the server
start();

