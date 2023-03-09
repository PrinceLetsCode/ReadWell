const { User } = require('../models/schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/sendEmail');
const { v4: uuid } = require('uuid');


const updateEmail = async (req, res) => {
	try {
		// * get the old email, newEmail and Password.
		const { email, newEmail, password } = req.body;

		if (email === newEmail) {
			return res.status(200).send('cannot update to the same email');
		}

		// * check whether the user exists.
		const user = await User.findOne({ email }, { password: 1, verificationString: 1, isVerified: 1 });

		// * if user doesnt exist, return.
		if (!user) {
			return res.status(401).send("User not found.");
		}

		// * if user exists. check for the password.
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (isPasswordCorrect) {
			const newVerificationString = uuid();
			const updatedUser = await User.findOneAndUpdate({ email }, { email: newEmail, verificationString: newVerificationString, isVerified: false }, { new: true });
			console.log(updatedUser);
			try {
				// * sending email to registered email.
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
				console.log(error);
				res.status(500).send({ Message: "verification email not sent!" });
			}

			res.status(200).send('Email updated successfully');

		} else {
			res.status(401).send("Incorrect Password");
		}

	} catch (error) {
		res.status(500).send('something went wrong');
	}
}

module.exports = updateEmail;