
const { User } = require('../models/schema')


const verifyEmail = async (req, res) => {
	const { verificationString } = req.body;
	console.log(req.body);
	const user = await User.findOne({ verificationString });
	console.log(user);

	if (!user) {
		return res.status(401).send({ message: "The email verification code is incorrect" });
	}

	const { _id: id, name, email, userName } = result;


	await User.updateOne({ email }, { isVerified: true });

	// await db.collection('users').updateOne({ _id: ObjectID(id) }, {
	// 	$set: { isVerified: true }
	// });

	jwt.sign({ id, name, email, userName },
		process.env.JWT_SECRET,
		{
			expiresIn: '2d'
		}, (err, token) => {
			if (err) {
				return res.status(401).send({ message: "Something went wrong" });
			}
			res.status(200).json({ token });
		}
	);

}

module.exports = verifyEmail;