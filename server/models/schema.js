const mongoose = require('mongoose');


// * Schema for All Books Directory
const allBooksSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'must provide name of the book'],
		trim: true,
		maxlength: [50, 'name cannot be more than 50 characters'],
		unique: true
	},
	authorName: {
		type: String,
		required: true,
		trim: true
	},
	readingStatus: {
		type: Number,
		default: false
		// 0 -> Start Reading
		// 1 -> Ongoing
		// 2 -> Completed
	},
	favourites: {
		type: Boolean,
		default: false
	}
}, { timestamps: true });


// * Schema for Ongoing Books Directory
const ongoingBooksSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'must provide name of the book'],
			trim: true,
			maxlength: [40, 'name cannot be more than 40 characters'],
			unique: true
		},
		authorName: {
			type: String,
			required: true,
			trim: true
		},
	}, { timestamps: true, });



// * Schema for Favourites Books Directory
const favouriteBooksSchema = new mongoose.Schema({
	// Do add Created_at and updated_at flags for your reference
	//Also it helps to add an ID column as well but not mandatory
	name: {
		type: String,
		required: [true, 'must provide name of the book'],
		trim: true,
		maxlength: [40, 'name cannot be more than 40 characters'],
		unique: true
	},
	authorName: {
		type: String,
		required: true,
		trim: true
	},

}, { timestamps: true })


// * Schema for Completed Books Directory
const completedBooksSchema = new mongoose.Schema({

	name: {
		type: String,
		required: [true, 'must provide name of the book'],
		trim: true,
		maxlength: [40, 'name cannot be more than 40 characters'],
		unique: true
	},
	authorName: {
		type: String,
		required: true,
		trim: true
	},

}, { timestamps: true })


const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
	},
	userName: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
		trim: true,
	},
	phone: Number,
	verificationString: String,
	isVerified: {
		type: Boolean,
		default: false
	},
	allBooks: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'AllBooks',
	}],
	favouriteBooks: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'FavouriteBooks',
	}],
	ongoingBooks: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'OngoingBooks',
	}],
	completedBooks: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'CompletedBooks',
	}],
});

const AllBooks = mongoose.model('AllBooks', allBooksSchema);
const FavouriteBooks = mongoose.model('FavouriteBooks', favouriteBooksSchema);
const OngoingBooks = mongoose.model('OngoingBooks', ongoingBooksSchema);
const CompletedBooks = mongoose.model('CompletedBooks', completedBooksSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
	AllBooks,
	FavouriteBooks,
	OngoingBooks,
	CompletedBooks,
	User,
};
