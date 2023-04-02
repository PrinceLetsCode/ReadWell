/**  
 * @description: This component is used to display the single book in the favourite books section
 * @param {Object} props - The props passed to the component by its parent
 * @return {JSX.Element} The JSX code representing the SingleBooksFavourite component
 * @requires react (for JSX)
 * @requires react-icons/ai (for the delete icon)
 * @requires axios (for sending requests to the server)
 * @requires ../../auth/useUser (context)
 * @requires ../../context/allBooksContext (context)
 * */


// Import the required modules
import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useAllBooksContext } from '../context/allBooksContext';
import axios from 'axios';
import useUser from '../auth/useUser';


// The SingleBooksFavourite component
const SingleBooksFavourite = ({ book }) => {

	// Destructure the book object
	const { bookName, authorName, createdAt } = book;

	// 	Retrieve the bookDeleted state and the setBookDeleted function from the AllBooksContext
	const { bookDeleted, setBookDeleted } = useAllBooksContext();

	// 	Retrieve the user object from the authentication context
	const user = useUser();

	// Delete the book from the user's favourite books
	const deleteFromFavourite = async () => {
		try {
			//  Send a DELETE request to the server to delete the book from the user's favourite books.
			await axios.delete('/api/v1/user/favouriteBooks/delete', {
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


	//  Return the JSX code for the SingleBooksFavourite component
	return (
		<div className='single-book'>
			<div className='book-and-author'>
				<h1>{bookName}</h1>
				<p>{authorName}</p>
			</div>
			<div className='book-options'>
				<AiFillDelete
					onClick={deleteFromFavourite}
					className='icons delete'
				/>

				<div className='btn date'>{new Date(createdAt).toDateString()}</div>
			</div>
		</div>
	);
};

// Export the SingleBooksFavourite component
export default SingleBooksFavourite;