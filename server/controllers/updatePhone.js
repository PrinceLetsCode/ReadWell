const { User } = require('../models/schema');
const bcrypt = require('bcrypt');


const updatePhone = async (req, res) => {
	try {
		// * get the email,phone,newphone and pass.
		const { email, phone, newPhone, password } = req.body;

		if (phone === newPhone) {
			return res.status(400).send('Cannot update to same phone number.')
		}

		const user = await User.findOne({ email }, { phone: 1, password: 1 });
		if (!user) {
			return res.status(401).send('user not found');
		}
		if (phone != user.phone) {
			return res.status(401).send('current phone number is not correct.');
		}
		const isCorrect = await bcrypt.compare(password, user.password);
		if (isCorrect) {
			const updatedUser = await User.findOneAndUpdate({ email }, { phone: newPhone }, { new: true });
			res.status(200).send('phone number updated successfully');
		}
		else {
			res.status(401).send('Incorrect Credentials');
		}

	} catch (error) {
		res.status(500).send('something went wrong on server side.');
	}
}

module.exports = updatePhone;