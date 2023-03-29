/** 
 * @description This component is used to display all the favourite books of the user.
 * @return {JSX.Element} The JSX code representing the FavouriteBooks page.
 * @requires react (for JSX)
 * @requires react-router-dom (for navigation)
 * @requires useUser (for getting the user details)
 * @requires axios (for making API calls)
 * @requires SingleBooksFavourite ( component to display a single book )
 * @requires allBooksContext ( for getting the bookDeleted state )
 */



// Import the required modules
import React, { useState, useEffect } from 'react';
import useUser from '../auth/useUser';
import axios from 'axios';
import SingleBooksFavourite from '../components/SingleBooksFavourite.js';
import { useAllBooksContext } from '../context/allBooksContext';


// The FavouriteBooks component
const FavouriteBooks = () => {

	// Get the user object from the authentication context
	const user = useUser();

	// Set the state for the favourite books
	const [favouriteBooks, setFavouriteBooks] = useState([]);

	// Set the state for the loading status
	const [isLoading, setIsLoading] = useState(true);

	// Get the bookDeleted state from the allBooksContext
	const { bookDeleted } = useAllBooksContext();

	// Function to retrieve the favourite books from the server
	const getFavouriteBooks = async () => {
		try {

			// Send a GET request to the server to retrieve the favourite books
			const res = await axios.get(`/api/v1/${user.email}/favouriteBooks`);

			// Set the favouriteBooks state to the data retrieved from the server
			const data = res.data.favouriteBooks;

			// Set the favouriteBooks state to the data retrieved from the server
			setFavouriteBooks(data);

		} catch (error) {

			console.log(error);
		}
	}


	// Call the getFavouriteBooks function whenever the bookDeleted state changes
	useEffect(() => {
		getFavouriteBooks();

		// Set the isLoading state to false
		setIsLoading(false);
	}, [bookDeleted]);



	// If the isLoading state is true, display the loading message
	if (isLoading) {
		return (
			<div className='main-container'>
				<h1 className='headings'>Favourite Books</h1>
				<h2 className='no-books'><ul>Loading...</ul></h2>
			</div>
		);
	}
	

	// If the favouriteBooks state is empty, display the no books message
	if (favouriteBooks.length === 0) {
		return (
			<div className='main-container'>
				<h1 className='headings'>Favourite Books</h1>
				<h2 className='no-books'><ul>There are no books in the directory.</ul></h2>
			</div>
		);
	}


	// If the favouriteBooks state is not empty, display the favourite books
	return (
		<section className='main-container'>

			<h1 className='headings'>Favourite Books</h1>
			{
				favouriteBooks.map((book, index) => {
					return (
						<article key={index} className='books-container'>
							<SingleBooksFavourite book={book} />
						</article>
					)
				})
			}
		</section>
	)
};

// Export the FavouriteBooks component
export default FavouriteBooks;