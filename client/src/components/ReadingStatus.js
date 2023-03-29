/** 
* @description - This component is used to display the reading status of a book in the user's library.
* It displays a button with the text "Start Reading" if the book is not in the user's library.
* It displays a button with the text "Ongoing" if the book is in the user's library and the user is currently reading it.
* It displays a button with the text "Completed" if the book is in the user's library and the user has completed reading it.

* @param {Object} props -  The props passed to the component by its parent.
* @return {JSX.Element} The JSX code representing the ReadingStatus component.
* @requires axios (for sending requests to the server)
* @requires react (for creating the component)
* @requires ../../auth/useUser (context)
* @requires ../../context/allBooksContext (context)
*/


// Import the required modules
import React from 'react';
import axios from 'axios';
import useUser from '../auth/useUser';
import { useAllBooksContext } from '../context/allBooksContext';

// The ReadingStatus component
const ReadingStatus = ({ readingStatus, bookName, authorName }) => {

	// Retrieve the user object from the authentication context
	const user = useUser();

	// Retrieve the readingStatusChanged state and the setReadingStatusChanged function from the AllBooksContext
	const { readingStatusChanged, setReadingStatusChanged } = useAllBooksContext();


	// Add the book to the user's library and set the reading status to "ongoing" 
	const addToOngoing = async () => {
		try {

			// Send a POST request to the server to add the book to the user's library.
			await axios.post('/api/v1/user/addToOngoing', {
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

	// returning the "Start Reading" button if the book is not in the user's "ongoing" library.
	if (readingStatus == 0) return <button
		className='btn'
		onClick={addToOngoing}
	>Start Reading</button>
	

	// returning the "Ongoing button" if the book is in the user's "ongoing" library.
	else if (readingStatus == 1) return <button disabled={true} className='btn ongoing'>Ongoing</button>
	//  returning the "Completed" button if the book is in the user's "completed" library.
	else return <button disabled={true} className='btn completed'>Completed</button>
};

// Export the ReadingStatus component
export default ReadingStatus;