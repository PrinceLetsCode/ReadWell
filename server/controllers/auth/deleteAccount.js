/**
 * @description - This function deletes a user's account
 * @param {object} req - The request object containing the email parameter in the body.
 * @param {object} res - The response object containing either the user's information or an error message.
 * @returns {object} - Either the user's information or an error message.
 * @requires schema - For getting the User model.
  */


// Import the User model
const { User } = require('../../models/schema');


const deleteAccount = async (req, res) => {
	try {
		// Retrieve the email parameter from the request body
		const { email } = req.body;

		if (!email) {
			return res.status(200).send({ message: "user not found" });
		}
		
		// Find the user in the database and delete it.
		const deleteUser = await User.deleteOne({ email });
		console.log(deleteUser);

		// If the user is not found, return an error message
		if (!deleteUser) {
			return res.status(200).send({ message: "User not found" });
		}

		// Return the user's information
		res.status(200).send({ message: "User deleted" });

	} catch (error) {

		// If an error occurs, return a 500 status code with an error message
		res.status(500).send('something went wrong');
	}
}

// Export the deleteAccount controller
module.exports = deleteAccount;