/** 
 * @description This page is shown when the user clicks on the verification link in the email and the verification is successful.
 * @return {JSX.Element} The JSX code representing the EmailVerificationSuccess page.
 * @requires react (for JSX)
 * @requires react-router-dom (for navigation)
 */



// Import the required modules
import React from 'react'
import { useNavigate } from 'react-router-dom';


// The EmailVerificationSuccess component
const EmailVerificationSuccess = () => {

	// for navigation
	const navigate = useNavigate();

	// Return the JSX code
	return (
		<section className='main-container'>
			<h1>Success!</h1>
			<p>Thanks for verifying your email, now you can use all site features</p>

			<button className='btn' onClick={() => { navigate('/') }}>Go to Home Page</button>
		</section>
	);
};

// Export the EmailVerificationSuccess component
export default EmailVerificationSuccess;