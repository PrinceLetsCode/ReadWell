const { User } = require('../models/schema')


const verifyEmail = async (req, res) => {
	try {
		console.log(req);
		const { verificationString } = req.body;

		const user = await User.findOne({ verificationString }, { verificationString: 1, isVerified: 1, email: 1 });
		console.log(user);

		if (!user) {
			return res.status(401).send({ message: "The email verification code is incorrect" });
		}

		const email = user.email;
		const isEmailVerified = await User.findOneAndUpdate({ email }, { isVerified: true }).select('isVerified');

		res.status(200).send(isEmailVerified);
	} catch (error) {
		res.status(500).send(error);
	}

}

module.exports = verifyEmail;