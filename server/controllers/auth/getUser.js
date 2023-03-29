
/**
 @description getUser - A controller function that retrieves a user's information by email.
 @param {object} req - The request object containing the email parameter in the body.
 @param {object} res - The response object containing either the user's information or an error message.
 @returns {object} - Either the user's information or an error message.
 @requires schema - For getting the User model.
 */


const { User } = require('../../models/schema');


const getUser = async (req, res) => {
	try {
		// Retrieve the email parameter from the request body
		const { email } = req.body;

		// Find the user in the database and exclude sensitive fields from the response
		const user = await User.findOne(
			{ email },
			{
				_id: 0,
				password: 0,
				verificationString: 0,
				__v: 0
			});

		// If the user is not found, return an error message
		if (!user) {
			return res.status(200).send({ message: "User not found" });
		}

		// Return the user's information
		res.status(200).send(user);
	} catch (error) {
		// If an error occurs, return a 500 status code with an error message
		res.status(500).send('something went wrong');
	}

}

// Export the getUser controller
module.exports = getUser;