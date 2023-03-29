/**
 * @description - this function is used to register a new user.
 * @param {Object} req - the request object.
 * @param {Object} res - the response object.
 * @returns {Object} - returns a JSON object containing the token if the user is authenticated or an error message otherwise.
 * @requires bcrypt - For hashing the password.
 * @requires schema - For getting the User model.
 * @requires jsonwebtoken - For signing a token.
 * @requires sendEmail - For sending a verification email to the user.
 * @requires uuid - For generating a unique verification string.
  */


// import the required modules.
const { User } = require('../../models/schema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../../utils/sendEmail');
const { v4: uuid } = require('uuid');


// the signUp controller.
const signUp = async (req, res) => {

	try {

		// get the required data from the request body.
		const { name, email, userName, password, phone } = req.body;
		
		// check if the user already exists.
		const userExists = await User.findOne({ email });

		// if user exists, return.
		if (userExists) {
			return res.status(200).send({ message: 'User already exists' });
		}
		else {

			// if user doesn't exist, hash the password.
			const hashPass = await bcrypt.hash(password, 12);

			// generate a unique verification string.
			const verificationString = uuid();

			// create a new user object.
			const newUserData = {
				name, email, userName, password: hashPass, phone, verificationString
			}

			// create a new user in the database.
			const newUser = await User.create(newUserData);

			// send a verification email to the user.
			try {
				// * sending email to registered email.
				await sendEmail({
					to: email,
					from: "readwellwebsite@gmail.com",
					subject: "please verify your email",
					text: `
					Thanks for signing up! To verify your email, click here:
					http://localhost:3000/user/verifyEmail/${verificationString}
				`
				});

			} catch (error) {
				res.status(500).send({ Message: "verification email not sent!" });
			}

			// sign a token and return it.
			jwt.sign(
				{
					name,
					email,
					userName,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: '2d'
				}, (err, token) => {
					if (err) {
						// if something goes wrong, return an error message.
						return res.status(500).send({ message: "Something went wrong"});
					}
					else {
						// return the token.
						res.status(200).send({ token });
					}
				});
		}
	} catch (error) {
		// if something goes wrong, return an error message.
		res.status(500).send({ message: "Something went wrong" });
	}
}


module.exports = signUp;