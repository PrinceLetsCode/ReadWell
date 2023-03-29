/**
 * @description This component represents the navigation bar of the application.
 * @return {JSX.Element} The JSX code representing the navigation bar.
 * @requires react (for JSX)
 * @requires react-icons (for the icons) 
 * @requires react-router-dom (for navigation)
 * @requires ../context/sidebarContext (for the sidebar context)
*/

// Import the required modules
import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { useSidebarContext } from '../context/sidebarContext';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
	//  Get the function to toggle the sidebar from the sidebar context
	const { toggleSidebar } = useSidebarContext();
	const navigate = useNavigate();
	return (
		<nav>
			{/*The logo of the application */}
			<h1 onClick={()=> navigate('/')}>ReadWell</h1>

			{/* The user profile icon, which toggles the sidebar when clicked */}
			<FaUserAlt className='profile-icon' onClick={toggleSidebar} />
		</nav>
	);

};

export default NavBar;
