/**  
 * @description This file contains the code for the CompletedBooks page. It displays all the books that the user has marked as completed.
 * @return {JSX.Element} The JSX code representing the CompletedBooks page.
 * @requires react (for JSX)
 * @requires react-router-dom (for navigation)
 * @requires axios (for sending requests to the server)
 * @requires ../auth/useUser (context)
 * @requires ../context/allBooksContext (context)
 * @requires ../components/SingleBookCompleted (component)
 * */  


// import the required modules
import React, { useState, useEffect } from 'react';
import useUser from '../auth/useUser';
import axios from 'axios';
import SingleBookCompleted from '../components/SingleBookCompleted';
import { useAllBooksContext } from '../context/allBooksContext';


// The CompletedBooks page
const CompletedBooks = () => {

	// Retrieve the user object from the authentication context
	const user = useUser();
	// Set the state for the completed books
	const [completedBooks, setCompletedBooks] = useState([]);

	//  Set the state for the loading status
	const [isLoading, setIsLoading] = useState(true);

	// 	Retrieve the bookDeleted state from the allBooksContext
	const { bookDeleted } = useAllBooksContext();


	// Function to retrieve the completed books from the server
	const getCompletedBooks = async () => {
		try {

			// Send a GET request to the server to retrieve the completed books
			const res = await axios.get(`/api/v1/${user.email}/completedBooks`);

			// Set the completedBooks state to the data retrieved from the server
			const data = res.data.completedBooks;

			// Set the completedBooks state to the data retrieved from the server
			setCompletedBooks(data);

		} catch (error) {
			console.log(error);
		}
	}


	// Call the getCompletedBooks function whenever the bookDeleted state changes
	useEffect(() => {
		getCompletedBooks();

		// Set the isLoading state to false
		setIsLoading(false);
	}, [bookDeleted]);


	// If the isLoading state is true, display a loading message
	if (isLoading) {
		return (
			<div className='main-container'>
				<h1 className='headings'>Completed Books</h1>
				<h2 className='no-books'><ul>Loading...</ul></h2>
			</div>
		);
	}

	// If the completedBooks state is empty, display a message
	if (completedBooks.length === 0) {
		return (
			<div className='main-container'>
				<h1 className='headings'>Completed Books</h1>
				<h2 className='no-books'><ul>There are no books in the directory.</ul></h2>
			</div>);
	};

	
	return (
		<section className='main-container'>
			<h1 className='headings'>Completed Books</h1>
			{
				// Map over the completedBooks state and display the SingleBookCompleted component for each book
				completedBooks.map((book, index) => {
					return (
						<article key={index} className='books-container'>
							<SingleBookCompleted book={book}/>
						</article>
					)
				})
			}
		</section>
	)
};

// Export the CompletedBooks component
export default CompletedBooks