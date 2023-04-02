/** 
 * @description This page is displayed when a user signs up and is not verified yet.
 * @return {JSX.Element} The JSX code representing the PleaseVerifyEmailPage page.
 * @requires react (for JSX)
 * @requires react-router-dom (for navigation)
 */


// Import the required modules
import React from 'react';
import { useNavigate } from 'react-router-dom';

// The PleaseVerifyEmailPage component
const PleaseVerifyEmailPage = () => {

	// for navigation
	const navigate = useNavigate();

	// Return the JSX code
	return (
		<div className='main-container'>
			<div className='content-container'>
				<h1>Thanks for signing up!</h1>
				<p>
					A verification email has been sent to your provided email address, please verify your email to unlock full site features.
				</p>

				<button onClick={() => navigate('/')} className='btn'>Go to Home Page</button>
			</div>
		</div>
	)
};

// Export the PleaseVerifyEmailPage component'
export default PleaseVerifyEmailPage;