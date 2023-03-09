const { User } = require('../models/schema');
const bcrypt = require('bcrypt');

const updatePassword = async (req, res) => {
	try {
		const { email, newPassword, password } = req.body;
		console.log(email, newPassword, password);
		if (newPassword === password) {
			return res.status(400).send('cannot update to the same password.');
		}
		const user = await User.findOne({ email }, { password: 1 });
		const isCorrect = await bcrypt.compare(password, user.password);
		if (isCorrect) {
			const newHashPassword = await bcrypt.hash(newPassword, 12);
			const updatedUser = await User.findOneAndUpdate({ email }, { password: newHashPassword }, { new: true });
			res.status(200).send('Password updated successfully');
		}
		else {
			return res.status(400).send("incorrect credentials");
		}

	} catch (error) {
		res.status(500).send('Something went wrong on the server side.');
	}
}

module.exports = updatePassword;