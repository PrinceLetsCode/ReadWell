/**
 * @description - This function is used to update the password of the user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} - The response object.
 * @requires bcrypt - For hashing the password.
 * @requires ../../models/schema - For getting the User model.
  */


// import the required modules.
const { User } = require('../../models/schema');
const bcrypt = require('bcrypt');

// the updatePassword controller.
const updatePassword = async (req, res) => {


	try {
		// get the required data from the request body.
		const { email, newPassword, password } = req.body;

		// check if the new password is the same as the old password.
		if (newPassword === password) {
			return res.status(400).send({ message: 'New password cannot be the same as the old password.'});
		}

		// get the user.
		const user = await User.findOne({ email }, { password: 1 });

		// check if password is correct.
		const isCorrect = await bcrypt.compare(password, user.password);

		// if password is correct, update the password.
		if (isCorrect) {

			// hash the new password.
			const newHashPassword = await bcrypt.hash(newPassword, 12);

			// update the password.
			await User.findOneAndUpdate({ email }, { password: newHashPassword }, { new: true });

			// send the success message.
			return res.status(200).send({ message: 'Password updated successfully.' });
		}
		else {
			return res.status(400).send({ message: 'Incorrect Credentials' });
		}

	} catch (error) {
		res.status(500).send({ message: 'Something went wrong.' });
	}
}

// export the updatePassword controller.
module.exports = updatePassword;