const { User } = require('../models/schema');
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
			return res.status(401).send("user doesn't exist");
		}

		// If the new username is the same as the current username, send an error response
		if (newUsername === user.userName) {
			return res.status(400).send(`Cannot update the username to current username.`);
		}

		// Check if the provided password matches the user's password
		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		// If the password is correct, update the user's username and return the updated document
		if (isPasswordCorrect) {
			const update = await User.findOneAndUpdate({ email }, { userName: newUsername }, { new: true }).select('userName');
			res.status(200).send(update);
		}
		else {
			// If the password is incorrect, send an error response
			res.status(400).send('incorrect password');
		}

	} catch (error) {
		// If an error occurs, send a generic error response
		res.status(500).send('something went wrong');
	}
}

// Export the updateUsername function
module.exports = updateUsername;