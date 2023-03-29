/** 
 * @description: This function is used to delete a book from favourite list of a user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The updated user document
 * @requires ../models/schema - The User model	
 */


// import required modules
const { User } = require('../models/schema');


// deleteFromFavourite controller
const deleteFromFavourite = async (req, res) => {
	try {

		// Extract the email and bookName from the request body
		const { email, bookName } = req.body;

		// Remove the book from the favouriteBooks array and return the updated document
		const deletedBook = await User.findOneAndUpdate(
			{ email, 'allBooks.bookName': bookName },
			{
				$pull: { favouriteBooks: { bookName } },
				// Set the favourites property of the book in the allBooks array to false
				$set: { 'allBooks.$.favourites': false }
			},
			{ new: true }

		);

		// Send a success response
		res.status(200).send(deletedBook);

	} catch (error) {
		// Send an error response
		res.status(200).send('Something went wrong');
	}
}

// Export the deleteFromFavourite controller
module.exports = deleteFromFavourite;