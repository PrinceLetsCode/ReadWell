/**
 * @description - This function is used to get all completed books of a user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The user document
 * @requires ../models/schema - The User model
 *  */  


// import required modules
const { User } = require('../models/schema');


// getCompletedBooks controller
const getCompletedBooks = async (req, res) => {
	try {
		// Extract the email from the request params
		const { user: email } = req.params;

		// if the user doesn't exist, send an error response
		if (!email) {
			return res.status(400).send({ error: 'User does not exist'});
		}

		// 		Get all completed books of the user
		const completedBooks = await User.findOne(
			{ email },
			{ completedBooks: 1 }
		)


		// if completedBooks is null, send an error response
		if (!completedBooks) {
			return res.status(400).send({ error: 'User does not exist'});
		}
		else {
			// Send a success response
			res.status(200).send(completedBooks);
		}

	} catch (error) {
		// 	Send an error response
		res.status(500).send({ error: 'Something went wrong' });
	}
}

// Export the getCompletedBooks controller
module.exports = getCompletedBooks;