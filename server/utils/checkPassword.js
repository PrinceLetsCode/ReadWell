const { User } = require('../models/schema');

const checkPassword = async (email,password) => {
	try {
		const userPassword = await User.findOne({ email }, { password: 1 });
		if (!userPassword) {
			return false;
		}
	} catch (error) {
		
	}
}