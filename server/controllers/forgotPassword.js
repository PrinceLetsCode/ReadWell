const bcrypt = require('bcrypt');
const { User } = require('../models/schema')

const forgotPassword = async (req, res) => {

	try {
		const { email, newPassword } = req.body;

		if (!email || !newPassword) {
			return res.status(401).send("Missing Credentials");
		}

		const newhashPass = await bcrypt.hash(newPassword, 12);
		const updateResult = await User.findOneAndUpdate({ email }, { password: newhashPass }, { new: true });
		console.log(updateResult);
		res.status(200).send({ message: 'Password Reset completed' });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}

}

module.exports = forgotPassword;