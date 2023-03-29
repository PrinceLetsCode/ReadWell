/**
 * @description: This file contains the schema for the database
 * @requires mongoose - The mongoose module
  */


// import required modules
const mongoose = require('mongoose');

//  Create a schema for the user
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
		unique: true
	},
	userName: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
		trim: true,
	},
	phone: String,
	verificationString: String,
	isVerified: {
		type: Boolean,
		default: false
	},
	allBooks: [{
		bookName: {
			type: String,
			required: [true, 'must provide name of the book'],
			trim: true,
			maxlength: [50, 'name cannot be more than 50 characters'],
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
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
	}],

	favouriteBooks: [{
		bookName: {
			type: String,
			required: [true, 'must provide name of the book'],
			trim: true,
			maxlength: [40, 'name cannot be more than 40 characters'],
		},
		authorName: {
			type: String,
			required: true,
			trim: true
		},
		createdAt: {
			type: Date,
			default: Date.now
		}

	}],
	ongoingBooks: [{

		bookName: {
			type: String,
			required: [true, 'must provide name of the book'],
			trim: true,
			maxlength: [40, 'name cannot be more than 40 characters']
		},
		authorName: {
			type: String,
			required: true,
			trim: true
		},
		createdAt: {
			type: Date,
			default: Date.now
		}

	}],
	completedBooks: [{

		bookName: {
			type: String,
			required: [true, 'must provide name of the book'],
			trim: true,
			maxlength: [40, 'name cannot be more than 40 characters']
		},
		authorName: {
			type: String,
			required: true,
			trim: true
		},
		createdAt: {
			type: Date,
			default:Date.now
		}

	}],
});


// Create a model for the user
const User = mongoose.model('User', userSchema);


// Export the User model
module.exports = {
	User,
};
