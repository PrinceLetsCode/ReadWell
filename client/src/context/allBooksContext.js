/**  
 * @descrition  This file contains the context for the all books page. It is used to update the state of the all books page when a book is deleted or a book's favourite status is changed or a book's reading status is changed.
 * @param {Object} props - The props passed to the component by its parent.
 * @returns {JSX.Element} The JSX code representing the AllBooksProvider component.
 * @requires react (for JSX)
 * @requires react (for the context) 
 * */  

// import the required modules.
import React, { useContext, useState } from 'react';


// Create a new React context for the sidebar state
const AllBooksContext = React.createContext();

// The AllBooksProvider component.
// This component is used to provide the context to the components that need it.
export const AllBooksProvider = ({ children }) => {

	// Create the state for favouriteChanged, bookDeleted and readingStatusChanged
	const [favouriteChanged, setFavouriteChanged] = useState(false);
	const [bookDeleted, setBookDeleted] = useState(false);
	const [readingStatusChanged, setReadingStatusChanged] = useState(false);
	

	// Return the context provider
	return (
		<AllBooksContext.Provider value={{
			// Pass the state and the setter function to the context provider
			favouriteChanged,
			setFavouriteChanged,
			bookDeleted,
			setBookDeleted,
			readingStatusChanged,
			setReadingStatusChanged,
		}}>
			{children}
		</AllBooksContext.Provider>
	)
};

/**
 * The useAllBooksContext hook allows child components to access the context from the AllBooksContext.
 * @return {Object} An object containing the favouriteChanged state and the setFavouriteChanged function
*/
export const useAllBooksContext = () => {
	return useContext(AllBooksContext);
}

