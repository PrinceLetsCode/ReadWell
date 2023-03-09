const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('../DB/connectDB');
const routes = require('../routes/routes');


app.use(express.json());

app.use('/api/v1', routes);


PORT = process.env.PORT || 5000

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

start();

