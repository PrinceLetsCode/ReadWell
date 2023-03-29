/** 
 * @description: This function is used to update the phone number of the user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} - The response object.
 * @requires bcrypt - For hashing the password.
 * @requires ../../models/schema - For getting the User model.
 */


// import the required modules.
const { User } = require('../../models/schema');
const bcrypt = require('bcrypt');


// the updatePhone controller.
const updatePhone = async (req, res) => {

	
	try {
		// get the required data from the request body.
		const { email, phone, newPhone, password } = req.body;

		// check if the new phone number is the same as the old phone number.
		if (phone === newPhone) {
			return res.status(200).send({ message: 'New phone number cannot be the same as the old phone number.'});
		}

		// get the user.
		const user = await User.findOne({ email }, { phone: 1, password: 1 });

		// if user is not found, send the error message.
		if (!user) {
			return res.status(200).send({ message: 'User not found.' });
		}

		// if phone number is not correct, send the error message.
		if (phone != user.phone) {
			return res.status(200).send({ message: 'Incorrect phone number.' });
		}

		// check if password is correct.
		const isCorrect = await bcrypt.compare(password, user.password);

		//  if password is correct, update the phone number.
		if (isCorrect) {

			// update the phone number.
			await User.findOneAndUpdate({ email }, { phone: newPhone }, { new: true });

			// send the success message.
			return res.status(200).send({ message: 'Phone number updated successfully.' });
		}
		else {
			return res.status(401).send({ message: 'Incorrect password.' });
		}

	} catch (error) {
		res.status(500).send({ message: 'Something went wrong.' });
	}
}

module.exports = updatePhone;