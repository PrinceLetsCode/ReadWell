/** 
 * @description This component is used to display the settings page.
 * @param {Object} props - The props passed to the component by its parent.
 * @return {JSX.Element} The JSX code representing the Settings component.
 * @requires react
 * @requires react-router-dom
*/


// Import the required modules
import React from 'react'
import { useNavigate } from 'react-router-dom';

// The Settings component
const Settings = () => {

	// for navigation
	const navigate = useNavigate();
	
	// Return the JSX code for the Settings component
	return (
		<section className='main-container'>
			<h1 className='headings'>Settings</h1>
			<article className='content-container'>
				<button onClick={() => navigate('/user/settings/updateUsername')} className='btn'>Update Username</button>
				<button onClick={() => navigate('/user/settings/updateEmail')} className='btn'>Update Email</button>
				<button onClick={() => navigate('/user/settings/updatePhone')} className='btn'>Update Phone</button>
				<button onClick={() => navigate('/user/settings/updatePassword')} className='btn'>Update Password</button>
			</article>
		</section>
	)
};

// Export the Settings component
export default Settings;