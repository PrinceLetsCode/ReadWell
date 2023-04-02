/** 
 * @description This page displays all the books in the directory.
 * @return {JSX.Element} The JSX code representing the AllBooks page.
 * @requires react (for JSX)
 * @requires axios (for making HTTP requests)
 * @requires ../components/SingleBookAll (component)
 * @requires ../auth/useUser (custom hook)
  */



// Import the required modules
import React, { useEffect, useState } from 'react';
import SingleBookAll from '../components/SingleBookAll';
import useUser from '../auth/useUser';
import axios from 'axios';
import { useAllBooksContext } from '../context/allBooksContext';


// The AllBooks component
const AllBooks = () => {

	// Retrieve the functions from the context
	const { favouriteChanged, bookDeleted, readingStatusChanged } = useAllBooksContext();

	// Retrieve the user object.
	const user = useUser();

	// Set the state for the allBooks array.
	const [allBooks, setAllBooks] = useState([]);

	// Set the state for the loading status.
	const [isLoading, setIsLoading] = useState(true);

	// Set the state for the error message.
	const [errorMessage, setErrorMessage] = useState('');


	// Function to get all the books in the directory.
	const getAllBooks = async () => {
		try {

			// Send a GET request to the server to get all the books in the directory.
			const res = await axios.get(`/api/v1/${user.email}/allBooks`);

			// Retrieve the data from the response.
			const data = res.data.allBooks;

			// Set the allBooks state to the data.
			setAllBooks(data);

		} catch (error) {
			setErrorMessage('Something Went Wrong');
		}
	};



	// Function to get all the books in the directory.
	useEffect(() => {
		getAllBooks();

		// Set the isLoading state to false.
		setIsLoading(false);
	}, [favouriteChanged, bookDeleted, readingStatusChanged]);


	// If the page is loading, display the loading message.
	if (isLoading) {
		return (
			<div className='main-container'>
				<h1 className='headings'>All Books</h1>
				<h2 className='no-books'><u>Loading...</u></h2>
			</div>
		);
	}


	// If there are no books in the directory, display the no books message.
	if (allBooks.length === 0) {
		return (
			<div className='main-container'>
				<h1 className='headings'>All Books</h1>
				<h2 className='no-books'><u>There are no books in the directory.</u></h2>
			</div>)

	};


	// return the JSX code.
	return (
		<section className='main-container'>
			<h1 className='headings'>All Books</h1>

			{
				errorMessage ? <h1>{errorMessage}</h1> :
					allBooks.map((book) => {
						return (
							<article key={book._id} className='books-container'>
								<SingleBookAll
									book={book}
								/>
							</article>
						);
					})
			}
		</section>
	);
};

// Export the AllBooks component.
export default AllBooks;	