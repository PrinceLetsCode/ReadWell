const {
	AllBooks,
	FavouriteBooks,
	CompletedBooks,
	OngoingBooks
} = require('../models/schema')

// * GETTING ALL THE BOOKS IN THE ALL BOOKS DIRECTORY

const getAllBooks = async (req, res) => {
	console.log('----------Getting All Books----------');

	try {
		const books = await AllBooks.find({});
		res.status(200).json({ books });
	} catch (error) {
		res.status(500).send(error.message);
	}

	console.log('----------Got All Books--------------');


}

// *  ADDING BOOK TO THE ALL DIRECTORY

const addToAll = async (req, res) => {

	console.log('--------- adding to all books ----------');

	try {
		const { name, authorName } = req.body;
		const books = await AllBooks.create({ name, authorName });
		res.status(201).json({ books });
	} catch (error) {
		res.status(500).send(error.message);
	}

	console.log('------------ added to all books -------------');
};

// * DELETING A BOOK FROM ALL DIRECTORY

const deleteFromAll = async (req, res, next) => {

	console.log('--------------Deleting From All Books----------------');

	try {
		const { id: bookID } = req.params;
		const book = await AllBooks.findById(bookID);
		const { name } = book;
		await Favourites.findOneAndDelete({ name });
		await Ongoing.findOneAndDelete({ name });
		await Completed.findOneAndDelete({ name });
		const books = await AllBooks.findOneAndDelete({ _id: bookID });
		if (!books) {
			return next(createCustomError(`No book with ID : ${bookID}`, 404));
		}
		res.status(200).json({ books });
	} catch (error) {
		res.status(500).send(error.message);
	}



	console.log('--------------Deleted From All Books----------------');

};


