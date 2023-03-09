import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSidebarContext } from '../context/sidebarContext';
import { useLoggedInContext } from '../context/loggedInContext';
import useToken from '../auth/useToken';
import useUser from '../auth/useUser';

const SideBar = () => {
	const navigate = useNavigate();
	const [, setToken] = useToken();
	const { loggedIn, setLoggedIn } = useLoggedInContext();
	const { isSidebarOpen } = useSidebarContext();
	const sidebarRef = useRef(null);
	const user = useUser();


	// * Handling Logout.
	const logoutUser = () => {
		// * Setting Token to null.
		setToken(null);

		// * Removing token from local storage.
		localStorage.removeItem('token');

		// * Navigating to the home page after being logged out.
		navigate('/');

		// * setting the context to logged out.
		setLoggedIn(false);
	};


	// * This function helps to close the sidebar when clicked outside of it.
	const handleClickOutside = (event) => {
		if (!event.target.classList.contains('sidebar') && !event.target.parentElement.classList.contains('profile-icon')) {
			sidebarRef.current.classList.add('sidebar-hidden');
		}
	};

	// * if sidebar is open it sets an click eventlistener so that we can click outside the sidebar to close it.
	if (isSidebarOpen) {
		document.addEventListener('click', handleClickOutside);
	}
	else {
		document.removeEventListener('click', handleClickOutside);
	}


	// * returning deifferent options depending on whether the user is logged in or not.
	return (
		<section>

			{loggedIn ? (

				<article
					ref={sidebarRef}
					className={`${isSidebarOpen ? 'sidebar' : 'sidebar sidebar-hidden'}`}
				>
					<button className='btn'>{ user.userName }</button>
					<button onClick={() => navigate('/user/userInfo')} className='btn'>
						User Info
					</button>
					<button onClick={() => navigate('/user/settings')} className='btn'>
						Settings
					</button>
					<button onClick={logoutUser} className='btn'>
						Logout
					</button>
					<button onClick={() => navigate('/')} className='btn'>
						Delete Account
					</button>
				</article>
			) : (
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

export default SideBar;
