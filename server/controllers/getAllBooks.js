/**
 * @description - This function is used to get all books of a user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The user document
 * @requires ../models/schema - The User model
  */


// import required modules
const { User } = require('../models/schema');

// getAllBooks controller
const getAllBooks = async (req, res) => {
	
	try {
		//  Extract the email from the request params
		const { user: email } = req.params;
		
		// Check if the user exists
		if (!email) {
			return res.status(400).send(`User doesn't exist`);
		}

		// Get all books of the user
		const allBooks = await User.findOne({ email }, { allBooks: 1 });

		// if allBooks is null, send an error response
		if (!allBooks) {
			return res.status(400).send(`User doesn't exist`);
		}
		else {
			// Send a success response
			res.status(200).send(allBooks);
		}

	} catch (error) {
		//  Send an error response
		res.status(500).send('something went wrong');
	}
};

// Export the getAllBooks controller
module.exports = getAllBooks;