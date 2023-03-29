/** 
 * @description This is the home page after login. It has a form to add a book and a grid of buttons to navigate to different pages.
 * @return {JSX.Element} The JSX code representing the HomeAfterLogin page.
 * @requires react (for JSX)
 * @requires react-router-dom (for navigation)
 * 
 * @requires useLoggedInContext (for checking if the user is logged in)
 * @requires useUser (for getting the user's email)
 * @requires axios (for making API calls)
 */


// Import the required modules
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoggedInContext } from '../context/loggedInContext';
import useUser from '../auth/useUser';
import axios from 'axios';


// The HomeAfterLogin component
const HomeAfterLogin = () => {

	// State for the book name
	const [bookName, setBookName] = useState('');
	const [authorName, setAuthorName] = useState('');

	// State for the error and success messages
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState(false);


	const [books, setBooks] = useState({
		allBooks: [],
		ongoingBooks: [],
		favouriteBooks: [],
		completedBooks: []
	});

	// Get the loggedIn state and the navigate function from the context
	const { loggedIn } = useLoggedInContext();
	const navigate = useNavigate();
	const user = useUser();


	// Function to add a book
	const addBook = async (e) => {
		e.preventDefault();

		// If the user is logged in then make an API call to add the book
		if (loggedIn) {

			try {

				// Send a POST request to the server to add the book
				const res = await axios.post('/api/v1/user/addBook', {
					email: user.email,
					bookName,
					authorName
				});

				// If the book is added successfully then set the success message
				if (res.status === 200) {
					setSuccessMessage('Book Added');
				}

			} catch (error) {

				// If the book already exists then set the error message
				if (error.response.status === 400 && error.response.data === 'Book already exists') {
					setErrorMessage('Book already exists!');
				} else {
					// If some other error occurs then set the error message
					setErrorMessage('Something went wrong');
				}
			}

			// Clear the messages after 3 seconds
			setTimeout(() => {
				setSuccessMessage('');
				setErrorMessage('');
			}, 3000);

		}
		else {
			// If the user is not logged in then navigate to the login page
			navigate('/login');
		}
	}


	// Function to get the number of books
	const getBooksCount = async () => {
		try {

			// Sending a POST request to the server to get user data
			const res = await axios.post('/api/v1/user/getUser', {
				email: user.email
			});

			// Storing received data from server
			const data = res.data;

			if (data.message === 'User not found') {
				setErrorMessage('User not found');
			}
			else {

			// Setting the state with the received data
				setBooks({
					allBooks: data.allBooks,
					ongoingBooks: data.ongoingBooks,
					favouriteBooks: data.favouriteBooks,
					completedBooks: data.completedBooks
				});
			}

			// Clear the error message after 3 seconds
			setTimeout(() => {
				setErrorMessage('');
			},3000);
			

		} catch (error) {
			setErrorMessage('Something went wrong');
		}
	}

	//  Get the number of books when the component mounts
	useEffect(() => {
		getBooksCount();
	}, [])


	// Return the JSX code
	return (
		<section className='main-container'>
			<section className='content-container'>
				<h1 className='heading-main'>ReadWell</h1>
				<form className='add-book' method='post'>
					<input
						type="text"
						name='bookName'
						value={bookName}
						onChange={(e) => setBookName(e.target.value)}
						placeholder='Book Name'
					/>


					<input
						type="text"
						name='AuthorName'
						value={authorName}
						onChange={(e) => setAuthorName(e.target.value)}
						placeholder='Author Name'
					/>

					<hr />

					{errorMessage && <div className='fail'>{errorMessage}</div>}
					{successMessage && <div className='success'>{successMessage}</div>}
					<button
						disabled={
							!bookName || !authorName
						}
						className='btn'
						onClick={addBook}
					>Add Book</button>
				</form>

			</section>

			<section className='btn-grid'>
				<button onClick={() => navigate('/user/allbooks')} className='btn home-btn'>All  ({ books.allBooks.length })</button>
				<button onClick={() => navigate('/user/ongoingbooks')} className='btn home-btn'>Ongoings ({books.ongoingBooks.length})</button>
				<button onClick={() => navigate('/user/favouritebooks')} className='btn home-btn'>Favourites ({books.favouriteBooks.length})</button>
				<button onClick={() => navigate('/user/completedbooks')} className='btn home-btn'>Completeds ({books.completedBooks.length})</button>
			</section>
		</section>


	)
};

// Export the HomeAfterLogin component
export default HomeAfterLogin;