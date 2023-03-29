/** 
 * @description: This function is used to add a book to favourites
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The updated user document
 * @requires ../models/schema - The User model
 */


// import required modules
const { User } = require('../models/schema');


// addToFavourites controller
const addToFavourites = async (req, res) => {

	try {

		//  Extract the bookName, authorName and email from the request body
		const { bookName, authorName, email } = req.body;

		// Check if book exists in the favouriteBooks array
		const bookExists = await User.findOne({
			email,
			favouriteBooks: { $elemMatch: { bookName } }
		});



		var favouriteBooks;

		// If the book exists, remove it from the favouriteBooks array
		if (bookExists) {
			favouriteBooks = await User.findOneAndUpdate(
				{ email, 'allBooks.bookName': bookName },
				{
					$pull: { favouriteBooks: { bookName } },
					//  Set the favourites property of the book in the allBooks array to false
					$set: {'allBooks.$.favourites':false}
				},
				{ new: true }
			);
		}
		else {

			// Create a new book object
			const newBoook = {
				bookName,
				authorName
			}

			// Add the book to the favouriteBooks array and return the updated document
			favouriteBooks = await User.findOneAndUpdate(
				{ email, 'allBooks.bookName': bookName },
				{
					$push: { favouriteBooks: newBoook },
					//  Set the favourites property of the book in the allBooks array to true
					$set: { 'allBooks.$.favourites': true }
				},
				{ new: true }
			).select('favouriteBooks');
		}

		// Send a success response
		res.status(200).send(favouriteBooks);
	} catch (error) {

		// Send an error response
		res.status(500).send('something went wrong');
	}
}

// Export the addToFavourites controller
module.exports = addToFavourites;