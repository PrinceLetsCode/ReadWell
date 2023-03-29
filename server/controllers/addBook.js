/** 
 * @description This function adds a book to the user's allBooks array
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The updated user document
 * @requires ../models/schema - The User model
 * */  



// import required modules
const { User } = require('../models/schema');


// addBook controller
const addBook = async (req, res) => {
	try {

		// Extract the email, bookName and authorName from the request body
		const { email, bookName, authorName } = req.body;


		// Check if the email, bookName and authorName are provided
		if (!email || !bookName || !authorName) {
			return res.status(400).send({ error: 'Incomplete Details' });
		}

		// Check if the book already exists in the allBooks array
		const bookExists = await User.findOne({
			email,
			allBooks: { $elemMatch: { bookName } }
		});


		// If the book already exists, send an error response
		if (bookExists) {
			return res.status(400).send('Book already exists');
		}
		

		// Create a new book object
		const newBook = {
			bookName,
			authorName
		};


		// Add the new book to the allBooks array and return the updated document
		const user = await User.findOneAndUpdate(
			{ email },
			{ $push: { allBooks: newBook } },
			{ new: true }
		).select('allBooks');
		
		// Send a success response
		res.status(200).send(user);
	} catch (error) {

		// Send an error response
		res.status(500).send({ error: 'Something went wrong' });
	}
};


// Export the addBook controller
module.exports = addBook;
