/** 
 * @description This page shows all the books that the user has marked as 'Ongoing'.
 * @return {JSX.Element} The JSX code representing the OngoingBooks page.
 * @requires react (for JSX)
 * @requires ../auth/useUser (for getting the user's email)
 * @requires ../components/SingleBookOngoing ( component for displaying the books)
 * @requires axios (for sending requests to the server)
 * @requires ../context/allBooksContext (for getting the readingStatusChanged state)
 */


// import the required modules
import React ,{useState,useEffect} from 'react';
import useUser from '../auth/useUser';
import SingleBookOngoing from '../components/SingleBookOngoing';
import axios from 'axios';
import { useAllBooksContext } from '../context/allBooksContext';


// The OngoingBooks page
const OngoingBooks = () => {

	// Retrieve the user object from the authentication context
	const user = useUser();

	// Set the state for the ongoing books
	const [ongoingBooks, setOngoingBooks] = useState([]);

	//  Set the state for the loading status
	const [isLoading, setIsLoading] = useState(true);

	// 	Retrieve the readingStatusChanged state from the allBooksContext
	const { readingStatusChanged, bookDeleted } = useAllBooksContext();

	// Function to retrieve the ongoing books from the server
	const getOngoingBooks = async () => {
		try {

			// Send a GET request to the server to retrieve the ongoing books
			const res = await axios.get(`/api/v1/${user.email}/ongoingBooks`);
			
			// get the data from the response
			const data = res.data.ongoingBooks;

			// Set the ongoingBooks state to the data retrieved from the server
			setOngoingBooks(data);

		} catch (error) {

			console.log(error);
		}
	}


	// Call the getOngoingBooks function whenever the readingStatusChanged state changes
	useEffect(() => {
		getOngoingBooks();

		// Set the isLoading state to false
		setIsLoading(false);
	}, [readingStatusChanged, bookDeleted]);


	// If the isLoading state is true, display the loading message
	if (isLoading) {
		return (
			<div className='main-container'>
				<h1 className='headings'>Ongoing Books</h1>
				<h2 className='no-books'><u>Loading...</u></h2>
			</div>
		);
	}

	// If there are no ongoing books, display the no books message
	if (ongoingBooks.length === 0) {
		return (
			<div className='main-container'>
				<h1 className='headings'>Ongoing Books</h1>
				<h2 className='no-books'><u> There are no books in the directory.</u></h2>
			</div>)

	};



	// If there are ongoing books, display them
	return (
		<section className='main-container'>
			<h1 className='headings'>Ongoing Books</h1>
			{
				ongoingBooks.map((book, index) => {
					return (
						<article key={index} className='books-container'>
							<SingleBookOngoing book={book} />
						</article>
					)
				})
			}
		</section>
	);
};


// Export the OngoingBooks page
export default OngoingBooks;