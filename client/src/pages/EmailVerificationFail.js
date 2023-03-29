/**
 * @description This page is displayed when the user clicks on the email verification link and the verification fails.
 * @return {JSX.Element} The JSX code representing the EmailVerificationFail page.
 * @requires react (for JSX)
 * @requires react-router-dom (for navigation)
*/


// Import the required modules
import React from 'react';
import { useNavigate } from 'react-router-dom';


// The EmailVerificationFail component
const EmailVerificationFail = () => {

	// for navigation
	const navigate = useNavigate();

	// Return the JSX code
	return (
		<section className='main-container'>
				<h1>Uh Oh...</h1>
			<p>Something went wrong while trying to verify your email.</p>
			
				{/*  Button to navigate to the Sign Up page */}
				<button className='btn' onClick={() => { navigate('/signup') }}>Back to Sign Up Page</button>
		</section>);
};

// Export the EmailVerificationFail component
export default EmailVerificationFail;