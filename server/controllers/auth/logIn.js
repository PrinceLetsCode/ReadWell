/**
	@description This function logs in a user by comparing the provided email and password to the user credentials stored in the database.
	@param {object} req - The request object containing user email and password.
	@param {object} res - The response object that sends back a token if the user is authenticated or an error message otherwise.
	@returns {object} - Returns a JSON object containing the token if the user is authenticated or an error message otherwise.
	@requires bcrypt - For comparing the provided password to the hashed password stored in the database.
	@requires schema - For getting the User model.
	@requires jsonwebtoken - For signing a token.
	*/


// Import the required modules
const bcrypt = require('bcrypt'); 
const { User } = require('../../models/schema')
const jwt = require('jsonwebtoken');


// The logIn controller
const logIn = async (req, res) => {


	try {


		// retrieve the email and password from req body.
		const { email, password } = req.body;

		// find the user from the database and get the required data.
		const user = await User.findOne({ email }, { name: 1, email: 1, userName: 1, password: 1 });

		//  if user doesn't exist, return.
		if (!user) {
			return res.status(200).send({ message: "User doesn't exist" });
		}

		// if user exists, get the details, match the password.
		const { name, userName } = user;
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		// if the password is correct,return a signed token.
		if (isPasswordCorrect) {
			jwt.sign({
				name,
				email,
				userName,
			}, process.env.JWT_SECRET, {
				expiresIn: '2d'
			}, (err, token) => {
				if (err) {
					return res.status(500).send(err);
				}
				res.status(200).send({ token });
			});
		} else {
			// else return, password is not correct.
			res.status(200).send({ message: 'Wrong credentials' });
		}
		
	} catch (error) {
		res.status(500).send({ message:"Something went wrong"});
	}

	

}

module.exports = logIn;
