/** 
 * @description This function verifies the email of the user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The updated user document
 * @requires ../../models/schema - The User model
 */



// import required modules
const { User } = require('../../models/schema');


// verifyEmail controller
const verifyEmail = async (req, res) => {
	try {


		//  Extract the verificationString from the request body
		const { verificationString } = req.body;

		// Find the user with the given verificationString and return only their verificationString and isVerified
		const user = await User.findOne({ verificationString }, { verificationString: 1, isVerified: 1, email: 1 });

		// If no user is found, send an error response
		if (!user) {
			return res.status(401).send({ message: "The email verification code is incorrect" });
		}

		const email = user.email;

		// If the verificationString is correct, update the user's isVerified and return the updated document
		const isEmailVerified = await User.findOneAndUpdate({ email }, { isVerified: true }).select('isVerified');

		//  If the email is verified, send a success response
		res.status(200).send({ message: "Email verified successfully"});
	} catch (error) {
		res.status(500).send({ error: "Something went wrong"});
	}

}

module.exports = verifyEmail;