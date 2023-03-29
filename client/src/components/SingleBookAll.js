/**
 * @description This component is used to display a single book in the all books page.
 * @param {Object} props - The props passed to the component by its parent.
 * @return {JSX.Element} The JSX code representing the SingleBookAll component. 
 * @requires react
 * @requires react-icons/ai
 * @requires axios
 * @requires ../../auth/useUser (context)
 * @requires ../../context/allBooksContext (context)
 * @requires ./ReadingStatus (component)
 * */ 


// Import the required modules
import React from 'react'
import { AiOutlineHeart, AiFillHeart, AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import useUser from '../auth/useUser';
import { useAllBooksContext } from '../context/allBooksContext';
import ReadingStatus from './ReadingStatus';



// The SingleBookAll component
const SingleBookAll = ({ book }) => {

	//  Retrieve the favouriteChanged state and the setFavouriteChanged function from the AllBooksContext
	const { favouriteChanged, setFavouriteChanged, setBookDeleted} = useAllBooksContext();

	// Destructure the book object
	const {
		bookName,
		authorName,
		readingStatus,
		favourites } = book;

	
	// Retrieve the user object from the authentication context
	const user = useUser();

	// Add the book to the user's favourites
	const addToFavourites = async () => {
		try {
			// Send a POST request to the server to add the book to the user's favourites.
			await axios.post('/api/v1/user/addToFavourite', {
				email: user.email,
				bookName,
				authorName,
			});

			// Update the favouriteChanged state to trigger a re-render of the Book component
			setFavouriteChanged(!favouriteChanged);

		} catch (error) {
			console.log(error);
		}
	};

	// Delete the book from the user's library
	const deleteBook = async () => {
		try {
			// Send a DELETE request to the server to delete the book from the user's library.
			await axios.delete('/api/v1/user/allBooks/delete', {
				data: {
					email: user.email,
					bookName,
				},
			});

			// Update the bookDeleted state to trigger a re-render of the Book component
			setBookDeleted(true);

		} catch (error) {
			console.log(error);
		}
	}


	// Return the JSX code representing the SingleBookAll component, which displays the book name, author name, reading status and favourite status.
	return (
		<div className='single-book'>
			<div className='book-and-author'>
				<h1>{bookName}</h1>
				<p>{authorName}</p>
			</div>
			{
				// If the book is in the user's favourites, display a filled heart icon, else display an empty heart icon.
				favourites ? <AiFillHeart onClick={addToFavourites} className='icons favourite' />
					: <AiOutlineHeart onClick={addToFavourites} className='icons favourite' />
			}
			<AiFillDelete onClick={deleteBook} className='icons delete' />

			{/* The ReadingStatus component */}
			<ReadingStatus
				readingStatus={readingStatus}
				bookName={bookName}
				authorName={authorName}
			/>
		</div>
	);
};

// Export the SingleBookAll component
export default SingleBookAll;