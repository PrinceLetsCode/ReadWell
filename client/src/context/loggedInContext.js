/**
	This module exports the LoggedInContext and the LoggedInProvider components.
	The LoggedInContext is a React context that provides information about the user's
	authentication status, and the LoggedInProvider component is responsible for
	managing the state of the context.
	
*/

import { useState, useEffect, createContext, useContext } from 'react';
import useUser from '../auth/useUser';

// Create a new React context for the authentication status of the user
const LoggedInContext = createContext();

/**
	The LoggedInProvider component is responsible for managing the state of the
	LoggedInContext. It uses the useUser hook to retrieve the user object from the
	authentication context, and sets the loggedIn state accordingly. The loggedIn
	state is updated whenever the user object changes.
	@param {Object} props - The children of the LoggedInProvider component
	@return {JSX.Element} The JSX code representing the LoggedInProvider component
*/


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

