/**
 * @description This file contains the SingleBookCompleted component which is used to display a single book in the completed books section.
 * @pararm {Object} props - The props passed to the component by its parent.
 * @return {JSX.Element} The JSX code representing the SingleBookCompleted component.
 * @requires react (for JSX)
 * @requires react-icons/ai (for the delete icon)
 * @requires axios ( for sending requests to the server)
 * @requires ../../auth/useUser (context)
 * @requires ../../context/allBooksContext (context)
 * @requires ./ReadingStatus (component)
 * */ 



// import the required modules
import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useAllBooksContext } from '../context/allBooksContext';
import axios from 'axios';
import useUser from '../auth/useUser';


// The SingleBookCompleted component
const SingleBookCompleted = ({ book }) => {


	// Destructure the book object and retrieve bookname, authorname and createdAt
	const { bookName, authorName, createdAt } = book;

	//  Retrieve the bookDeleted state and the setBookDeleted function from the AllBooksContext
	const { bookDeleted, setBookDeleted } = useAllBooksContext();

	//  Retrieve the user object from the authentication context
	const user = useUser();

	// Delete the book from the user's completed books
	const deleteFromCompleted = async () => {
		try {
			// Send a DELETE request to the server to delete the book from the user's completed books.
			await axios.delete('/api/v1/user/completedBooks/delete', {
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

	


	// Return the JSX code for the SingleBookCompleted component
	return (
		<div className='single-book'>
			<div className='book-and-author'>
				<h1>{bookName}</h1>
				<hp>{authorName}</hp>
			</div>

			<AiFillDelete onClick={deleteFromCompleted} className='icons delete' />
			<div className='btn date'>{ new Date(createdAt).toDateString()}</div>

		</div>
	);
};

// Export the SingleBookCompleted component
export default SingleBookCompleted;