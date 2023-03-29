/**
 * @description - Get favourite books of a user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The user document
 * @requires ../models/schema - The User model
  */



// import required modules
const { User } = require('../models/schema');

// getFavouriteBooks controller
const getFavouriteBooks = async (req, res) => {
	
	
	try {

		// Extract the email from the request params
		const { user: email } = req.params;

		// if the user doesn't exist, send an error response
		if (!email) {
			return res.status(400).send(`User does't exist.`);
		};

		// Get all favourite books of the user
		const favouriteBooks = await User.findOne(
			{ email },
			{ favouriteBooks: 1 }
		);

		// if favouriteBooks is null, send an error response
		if (!favouriteBooks) {
			return res.status(400).send(`User doesn't exist`);
		}
		else {
			// Send a success response
			res.status(200).send(favouriteBooks);
		}

		
	} catch (error) {

		// Send an error response
		res.status(500).send('something went wrong');
	}
}

// Export the getFavouriteBooks controller
module.exports = getFavouriteBooks;