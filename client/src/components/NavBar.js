/**
*	This component represents the navigation bar of the application.
*	It displays the logo and a user profile icon which, when clicked,
	toggles the sidebar.
	@return {JSX.Element} The JSX code representing the navigation bar
*/
import React, { useContext } from 'react';
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
