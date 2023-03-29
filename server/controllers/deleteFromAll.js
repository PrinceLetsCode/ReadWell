/**
 * @description - This function deletes a book from all the lists of a user.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The updated user document
 * @requires ../models/schema - The User model
  */


// import required modules
const { User } = require('../models/schema');


// deleteFromAll controller
const deleteFromAll = async (req,res) => {
	
	try {

		// Extract the email and bookName from the request body
		const { email, bookName } = req.body;
		
		// remove the book from all the lists and return the updated document
		const user = await User.findOneAndUpdate(
			{ email },
			{
				$pull: {
					allBooks: { bookName },
					favouriteBooks: { bookName },
					ongoingBooks: { bookName },
					completedBooks:{bookName}
				}
			},
			{new:true}
		);

		// Send a success response
		res.status(200).send(user);
	} catch (error) {

		// Send an error response
		res.status(500).send('Something went wrong.');
	}
	
}

// Export the deleteFromAll controller
module.exports = deleteFromAll;