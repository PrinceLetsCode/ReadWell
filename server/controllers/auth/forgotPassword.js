/** 
 * @description this is the controller for the forgot password route. It takes the email and the new password from the request body and updates the password in the database.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @return {Object} The response object.
 * @requires bcrypt (for hashing the password)
 * @requires schema (for getting the User model)
 */



// Import the required modules
const bcrypt = require('bcrypt');
const { User } = require('../../models/schema');


// The forgotPassword controller
const forgotPassword = async (req, res) => {


	try {
		// Get the email and the new password from the request body
		const { email, newPassword } = req.body;

		// If the email or the new password is missing then return an error
		if (!email || !newPassword) {
			return res.status(200).send({ message:"Missing Credentials"});
		}

		// Find the user with the given email
		const userExists = await User.findOne({ email });

		// If the user does not exist then return an error
		if (!userExists) {
			return res.status(200).send({message: "User does not exist"});
		}
		
		// Hash the new password
		const newhashPass = await bcrypt.hash(newPassword, 12);

		// Update the password in the database
		const updateResult = await User.findOneAndUpdate({ email }, { password: newhashPass }, { new: true });

		// If the password is not updated then return an error
		if (!updateResult) {
			return res.status(200).send("Password not updated");
		}

		// If the password is updated successfully then return a success message.
		res.status(200).send({ message: 'Password reset successful.' });
	} catch (error) {
		res.status(500).send('Something went wrong');
	}
};


// Export the forgotPassword controller
module.exports = forgotPassword;