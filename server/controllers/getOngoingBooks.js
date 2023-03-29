/**
 * @description: get all ongoing books of a user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The user document
 * @requires ../models/schema - The User model  
  */


// import required modules
const { User } = require('../models/schema');


// getOngoingBooks controller
const getOngoingBooks = async (req, res) => {


	try {

		// Extract the email from the request params
		const { user: email } = req.params;

		// if the user doesn't exist, send an error response
		if (!email) {
			return res.status(400).send(`User does't exist.`);
		}

		// Get all ongoing books of the user
		const ongoingBooks = await User.findOne(
			{ email },
			{ ongoingBooks: 1 }
		)

		// if ongoingBooks is null, send an error response
		if (!ongoingBooks) {
			return res.status(400).send(`User doesn't exist`);
		}
		else {
			// Send a success response
			res.status(200).send(ongoingBooks);
		}

	} catch (error) {

		// Send an error response
		res.status(500).send('something went wrong');
	}
}

// Export the getOngoingBooks controller
module.exports = getOngoingBooks;