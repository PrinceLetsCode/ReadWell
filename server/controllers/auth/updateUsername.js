/** 
 * @description This file contains the updateUsername function, which updates the username of a user in the database.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The updated user document
 * @requires bcrypt - The bcrypt module
 * @requires ../../models/schema - The User model
 */



const { User } = require('../../models/schema');
const bcrypt = require('bcrypt');


// Define the async function that updates the username
const updateUsername = async (req, res) => {
	try {
		// Extract the email, newUsername, and password from the request body
		const { email, newUsername, password } = req.body;
		console.log(email);
		// Find the user with the given email and return only their password and username
		const user = await User.findOne({ email }, { password: 1, userName: 1 });

		// If no user is found, send an error response
		if (!user) {
			return res.status(401).send({ message : 'User not found'});
		}

		// If the new username is the same as the current username, send an error response
		if (newUsername === user.userName) {
			return res.status(400).send({ message : 'New username cannot be the same as the current username'});
		}

		// Check if the provided password matches the user's password
		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		// If the password is correct, update the user's username and return the updated document
		if (isPasswordCorrect) {
			await User.findOneAndUpdate({ email }, { userName: newUsername }, { new: true }).select('userName');
			res.status(200).send({message: 'Username updated successfully'});
		}
		else {
			// If the password is incorrect, send an error response
			res.status(200).send({ error: 'Incorrect Credentials'});
		}

	} catch (error) {
		// If an error occurs, send a generic error response
		res.status(500).send({ error: 'Something went wrong'});
	}
}

// Export the updateUsername function
module.exports = updateUsername;