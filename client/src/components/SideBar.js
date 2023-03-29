/**
 * @description This file contains the sidebar component which is used to display the sidebar.
 * @returns {JSX.Element} The JSX code representing the sidebar component.
 * @requires react (for JSX)
 * @requires react-router-dom (for navigation)
 * @requires ../context/sidebarContext (for the sidebar context)
 * @requires ../context/loggedInContext (for the loggedIn context)
 * @requires ../auth/useToken (for the useToken hook)
 * @requires ../auth/useUser (for the useUser hook)
 * @requires axios (for making http requests)
 */
 


// import the required modules.
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSidebarContext } from '../context/sidebarContext';
import { useLoggedInContext } from '../context/loggedInContext';
import useToken from '../auth/useToken';
import useUser from '../auth/useUser';
import axios from 'axios';	


// The SideBar component.
const SideBar = () => {

	// The function to navigate to different routes.
	const navigate = useNavigate();

	// The function to set the token in the local storage. 
	const [, setToken] = useToken();

	// The function to set the loggedIn state in the loggedIn context.
	const { loggedIn, setLoggedIn } = useLoggedInContext();

	// The function to toggle the sidebar.
	const { isSidebarOpen } = useSidebarContext();
	
	// The reference to the sidebar. used to hide the sidebar when the user clicks outside the sidebar.
	const sidebarRef = useRef(null);

	// The user object.
	const user = useUser();

//  The function to logout the user.
	const logoutUser = () => {
		
		// Set the token to null.
		setToken(null);

		// Remove the token from the local storage.
		localStorage.removeItem('token');

		// Navigate to the home page.
		navigate('/');

		// Set the loggedIn state to false.
		setLoggedIn(false);
	};


	// The function to handle the click outside the sidebar.
	const handleClickOutside = (event) => {

		// If the user clicks outside the sidebar, hide the sidebar.
		if (!event.target.classList.contains('sidebar') && !event.target.parentElement.classList.contains('profile-icon')) {
			sidebarRef.current.classList.add('sidebar-hidden');
		}
	};

	// Add an event listener to the document when the sidebar is open.
	if (isSidebarOpen) {
		document.addEventListener('click', handleClickOutside);
	}
	// Remove the event listener when the sidebar is closed.
	else {
		document.removeEventListener('click', handleClickOutside);
	}



	const deleteAccount = async () => {
		try {
	
			// Find the user in the database and delete it.
			const deleteUser = await axios.delete('/api/v1/user/deleteAccount',
				{ data: { email: user.email } });
			
			console.log(deleteUser);
			setToken(null);

			// Remove the token from the local storage.
			localStorage.removeItem('token');


			// Set the loggedIn state to false.
			setLoggedIn(false);

			// Navigate to the home page.
			navigate('/');

		} catch (error) {
			console.log(error);
		 }
	}



	// The JSX code representing the sidebar.
	return (
		<section>

			{loggedIn ? (

				// The sidebar when the user is logged in. returns the user name, user info, settings, logout and delete account buttons.
				<article
					ref={sidebarRef}
					className={`${isSidebarOpen ? 'sidebar' : 'sidebar sidebar-hidden'}`}
				>
					<button className='btn'>{ user? user.userName : null}</button>
					<button onClick={() => navigate('/user/userInfo')} className='btn'>
						User Info
					</button>
					<button onClick={() => navigate('/user/settings')} className='btn'>
						Settings
					</button>
					<button onClick={logoutUser} className='btn'>
						Logout
					</button>
					<button onClick={deleteAccount} className='btn'>
						Delete Account
					</button>
				</article>
			) : (
					// The sidebar when the user is not logged in. returns the login and signup buttons.
				<article
					ref={sidebarRef}
					className={`${isSidebarOpen ? 'sidebar' : 'sidebar sidebar-hidden'}`}
				>
					<button onClick={() => navigate('/login')} className='btn'>
						Log In
					</button>
					<button onClick={() => navigate('/signup')} className='btn'>
						Sign Up
					</button>
				</article>
			)}
		</section>
	);
};

// Export the SideBar component.
export default SideBar;
