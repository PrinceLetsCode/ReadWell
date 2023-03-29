/**
 * @description - This controller deletes a book from the ongoing books array
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The updated user document
 * @requires ../models/schema - The User model
  */


//  import required modules
const { User } = require('../models/schema');


// 	deleteFromOngoing controller
const deleteFromOngoing = async (req, res) => {

	try {


		// 	Extract the email and bookName from the request body
		const { email, bookName } = req.body;

		// 	remove the book from the ongoingBooks array and return the updated document
		const deletedBook = await User.findOneAndUpdate(
			{ email, 'allBooks.bookName': bookName },
			{
				$pull: { ongoingBooks: { bookName } },
				//  Set the readingStatus property of the book in the allBooks array to 0 ( start reading )
				$set: { 'allBooks.$.readingStatus': 0 }
			},
			{ new: true }

		);

		// 	Send a success response
		res.status(200).send(deletedBook);

	} catch (error) {
		// 	Send an error response
		res.status(200).send('Something went wrong');
	}
}

// Export the deleteFromOngoing controller
module.exports = deleteFromOngoing;