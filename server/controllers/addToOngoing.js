/** 
 * @description: This function adds a book to the ongoing directory of the user.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The updated user document
 * @requires ../models/schema - The User model
 */


// import required modules
const { User } = require('../models/schema');


// addToOngoing controller
const addToOngoing = async (req, res) => {
	
	
	try {

		// Extract the email, bookName and authorName from the request body
		const { email, bookName, authorName } = req.body;

		// Check if the book exists in the ongoingBooks array
		const bookExists = await User.findOne({
			email,
			ongoingBooks: { $elemMatch: { bookName } }
		});

		// If the book exists, return an error
		if (bookExists) {
			return res.status(400).send('Book alredy exists in Ongoing directory.');
		}

		// Create a new book object
		const newBook = {
			bookName,
			authorName
		}

		// Add the new book to the ongoingBooks array and return the updated document
		const ongoingBooks = await User.findOneAndUpdate(
			{ email, "allBooks.bookName": bookName },
			{
				$push: { ongoingBooks: newBook },
				//  Set the readingStatus of the book to 1 ( ongoing )
				$set: { "allBooks.$.readingStatus": 1 }
			},
			{ new: true }
		).select('ongoingBooks');

		// Send a success response
		res.status(200).send(ongoingBooks);
	} catch (error) {
		// Send an error response
		res.status(500).send('Something went wrong.');
	}
}

// Export the addToOngoing controller
module.exports = addToOngoing;
