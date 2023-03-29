/**
 * @description This file contains the context for the authentication status of the user.
 * @param {Object} props - The children of the LoggedInProvider component
 * @returns {JSX.Element} The JSX code representing the LoggedInProvider component
 * @requires react (for JSX)
 * @requires react-router-dom (for navigation)
 * @requires react (for the context)
 * @requires ../auth/useUser (for the useUser hook)
*/

import { useState, useEffect, createContext, useContext } from 'react';
import useUser from '../auth/useUser';

// Create a new React context for the authentication status of the user
const LoggedInContext = createContext();

export function LoggedInProvider({ children }) {

	// Retrieve the user object from the authentication context
	const user = useUser();

	// Set the initial state of loggedIn to the user's authentication status
	const [loggedIn, setLoggedIn] = useState(!!user);

	// Update the loggedIn state whenever the user object changes
	useEffect(() => {
		setLoggedIn(!!user);
	}, [user]);

	// Provide the loggedIn state and the setLoggedIn function to child components
	return (
		<LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
			{children}
		</LoggedInContext.Provider>
	);
}


/**
	The useLoggedInContext hook allows child components to access the authentication
	status of the user from the LoggedInContext.
	@return {Object} An object containing the loggedIn state and the setLoggedIn function
*/
export function useLoggedInContext() {
	return useContext(LoggedInContext);
}

