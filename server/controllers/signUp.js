const { User } = require('../models/schema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const { v4: uuid } = require('uuid');

const signUp = async (req, res) => {
	const { name, email, userName, password, phone } = req.body;
	console.log(req.body);
	// * checking whether the user exists.
	const userExists = await User.findOne({ email });
	console.log(userExists);
	if (userExists) {
		res.status(200).send({ message: 'user already exists' });
	}
	else {

		const hashPass = await bcrypt.hash(password, 12);
		console.log(hashPass);
		const verificationString = uuid();
		console.log(verificationString);

		const newUserData = {
			name, email, userName, password: hashPass, phone, verificationString
		}

		console.log(newUserData);

		const newUser = await User.create(newUserData);
		console.log(newUser);
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
			})
		} catch (error) {
			console.log(error);
			res.status(500).send({ Message: "verification email not sent!" });
		}

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
		})

	}

}


module.exports = signUp;