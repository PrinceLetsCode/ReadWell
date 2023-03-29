/**
 * @description: updates the email of the user.
 * @param {object} req - The request object containing the old email, new email and password.
 * @param {object} res - The response object that sends back a success message if the email is updated or an error message otherwise.
 * @returns {object} - Returns a JSON object containing the success message if the email is updated or an error message otherwise.
 * @requires bcrypt - For comparing the provided password to the hashed password stored in the database.
 * @requires schema - For getting the User model.
 * @requires sendEmail - For sending the verification email to the new email.
 * @requires uuid - For generating a unique verification string. 
  */


// import the required modules.
const { User } = require('../../models/schema');
const bcrypt = require('bcrypt');
const sendEmail = require('../../utils/sendEmail');
const { v4: uuid } = require('uuid');


// the updateEmail controller.
const updateEmail = async (req, res) => {
	try {
		//  get the required data from the request body.
		const { email, newEmail, password } = req.body;

		// check if the new email is the same as the old email.
		if (email === newEmail) {
			return res.status(200).send({ message: 'Emails are the same' });
		}

		// check if the user exists.
		const user = await User.findOne({ email }, { password: 1, verificationString: 1, isVerified: 1 });

		if (!user) {
			return res.status(200).send({ message: 'User does not exist' });
		}

		// check if the password is correct.
		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		// if password is correct, update the email.
		if (isPasswordCorrect) {

			// generate a new verification string.
			const newVerificationString = uuid();

			// update the email.
			await User.findOneAndUpdate({ email }, { email: newEmail, verificationString: newVerificationString, isVerified: false }, { new: true });


			// send a verification email to the new email.
			try {
				await sendEmail({
					to: newEmail,
					from: "readwellwebsite@gmail.com",
					subject: "please verify your email",
					text: `
					Thanks for signing up! To verify your email, click here:
					http://localhost:3000/api/v1/verifyEmail/${newVerificationString}
				`
				})
			} catch (error) {
				res.status(200).send({ Message: "verification email not sent!" });
			}

			res.status(200).send({ message: 'Email updated successfully' });

		} else {
			res.status(200).send({ message: 'Invalid Credentials' });
		}

	} catch (error) {
		res.status(500).send({ message: 'Something went wrong' });
	}
}

module.exports = updateEmail;