/** 
 * @description This page is used to verify the email address of the user.
 * @return {JSX.Element} The JSX code representing the EmailVerificationPage page.
 * @requires react (for JSX)
 * @requires react-router-dom (for navigation)
 * @requires axios (for making HTTP requests)
 * @requires ./EmailVerificationFail (component)
 * @requires ./EmailVerificationSuccess (component)
 */


// Import the required modules
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EmailVerificationFail from './EmailVerificationFail';
import EmailVerificationSuccess from './EmailVerificationSuccess';


// The EmailVerificationPage component
const EmailVerificationPage = () => {

	// Set the state for the loading status
	const [isLoading, setIsLoading] = useState(true);

	// Set the state for the success status
	const [isSuccess, setIsSuccess] = useState(false);

	// Retrieve the verification string from the URL
	const { verificationString } = useParams();


	// Function to verify the email address
	useEffect(() => {
		const loadVerification = async () => {
			try {

				// Send a POST request to the server to verify the email address
				const res = await axios.post('/api/v1/user/verifyEmail', {
					verificationString
				});


				// Retrieve the data from the response
				const data = res.data;

				// retrieve the isVerified property from the data
				const { isVerified } = data;

				// if the email address is verified, set the isSuccess state to true
				if (isVerified) {
					setIsSuccess(true);
				}
				// if the email address is not verified, set the isSuccess state to false
				else {
					setIsSuccess(false);
				}

				// Set the isLoading state to false
				setIsLoading(false);

			} catch (error) {
				setIsSuccess(false);
				setIsLoading(false);
			}
		};
		
		// Call the loadVerification function
		loadVerification();
	}, [verificationString]);

	// if the page is loading, display the loading message
	if (isLoading) return <p>Loading...</p>;
	
	// if the email address is not verified, display the EmailVerificationFail component
	if (!isSuccess) return <EmailVerificationFail />
	
	// if the email address is verified, display the EmailVerificationSuccess component
	return <EmailVerificationSuccess />
};

// Export the EmailVerificationPage component
export default EmailVerificationPage;