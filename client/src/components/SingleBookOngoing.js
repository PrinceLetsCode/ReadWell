/**
 * @description This file contains the SingleBookOngoing component which is used to display a single book in the ongoing books section.
 * @pararm {Object} props - The props passed to the component by its parent.
 * @return {JSX.Element} The JSX code representing the SingleBookOngoing component.
 * @requires react (for JSX)
 * @requires react-icons/ai (for the delete icon)
 * @requires axios ( for sending requests to the server)
 * @requires ../../auth/useUser (context)
 * @requires ../../context/allBooksContext (context)
 * @requires ./ReadingStatus (component)
 *  */


// import the required modules
import React from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { useAllBooksContext } from '../context/allBooksContext';
import axios from 'axios';
import useUser from '../auth/useUser';



// The SingleBookOngoing component
const SingleBookOngoing = ({ book }) => {

	//  Destructure the book object and retrieve bookname, authorname and createdAt
	const { bookName, authorName, createdAt } = book;

	//  Retrieve the readingStatusChanged state and the setReadingStatusChanged function from the AllBooksContext
	const { readingStatusChanged, setReadingStatusChanged, bookDeleted, setBookDeleted } = useAllBooksContext();

	//  Retrieve the user object from the authentication context
	const user = useUser();

	// Add the book to the user's completed books
	const addToCompleted = async () => {
		try {
			// Send a POST request to the server to add the book to the user's completed books.
			await axios.post('/api/v1/user/addToCompleted', {
				email: user.email,
				bookName,
				authorName,
			});

			// Update the readingStatusChanged state to trigger a re-render of the Book component
			setReadingStatusChanged(!readingStatusChanged);

		} catch (error) {
			console.log(error);
		}
	};


	// Delete the book from the user's ongoing books 
	const deleteFromOngoing = async () => {
		try {
			// Send a DELETE request to the server to delete the book from the user's ongoing books.
			await axios.delete('/api/v1/user/ongoingBooks/delete', {
				data: {
					email: user.email,
					bookName,
				},
			});

			// Update the bookDeleted state to trigger a re-render of the Book component
			setBookDeleted(!bookDeleted);

		} catch (error) {
			console.log(error);
		}
	};

	// Return the JSX code for the SingleBookOngoing component
	return (
		<div className='single-book'>
			<div className='book-and-author'>
				<h1>{bookName}</h1>
				<p>{authorName}</p>
			</div>
			<div className='book-options'>
				<AiFillCheckCircle onClick={addToCompleted} className='icons mark-completed' />
				<AiFillDelete onClick={deleteFromOngoing} className='icons delete' />

				<div className='btn date'>{new Date(createdAt).toDateString()}</div>
			</div>
		</div>
	);
};

export default SingleBookOngoing;