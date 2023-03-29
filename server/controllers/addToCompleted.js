/** 
 * @description This function adds a book to the completedBooks array in the user's document.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The updated user document
 * @requires ../models/schema - The User model
 */


// import required modules
const { User } = require('../models/schema');


// addToCompleted controller
const addToCompleted = async (req, res) => {

	
	try {

		// Extract the email, bookName and authorName from the request body
		const { email, bookName, authorName } = req.body;

		// Check if the book already exists in the completedBooks array
		const bookExists = await User.findOne(
			{
				email,
				completedBooks: { $elemMatch: { bookName } }
			}
		);

		// If the book already exists, send an error response
		if (bookExists) {
			return res.status(400).send('Book Already Exists in Completed Directory.')
		}

		// Create a new book object
		const newBook = {
			bookName,
			authorName
		}

		//  Add the new book to the completedBooks array and return the updated document
		const completedBooks = await User.findOneAndUpdate(
			{ email, "allBooks.bookName": bookName },
			{
				$push: { completedBooks: newBook },
				$set: { "allBooks.$.readingStatus": 2 },
				$pull: { ongoingBooks: { bookName } }
			},
			{ new: true }
		).select('completedBooks');


		// Send a success response
		res.status(200).send(completedBooks);

	} catch (error) {
		// Send an error response
		res.status(500).send('Something went wrong.');
	}
}


// Export the addToCompleted controller
module.exports = addToCompleted;