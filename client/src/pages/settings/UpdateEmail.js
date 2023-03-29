/** 
 * @description This component is used to update the user's email address.
 * @param {Object} props - The props passed to the component by its parent.
 * @return {JSX.Element} The JSX code representing the UpdateEmail component.
 * @requires axios
 * @requires react
 * @requires react-router-dom
 * @requires ../../context/loggedInContext
 * */ 


// Import the required modules
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLoggedInContext } from '../../context/loggedInContext';

// The UpdateEmail component
const UpdateEmail = () => {

	// The state variables
	const [email, setEmail] = useState('');
	const [newEmail, setNewEmail] = useState('');
	const [password, setPassword] = useState('');

	// for error message.
	const [errorMessage, setErrorMessage] = useState('');

	// for navigation
	const navigate = useNavigate();

	// for context
	const { setLoggedIn } = useLoggedInContext();

	// The function to update the user's email address
	const updateEmail = async (e) => {
		//  Prevent the default action of the event
		e.preventDefault();

		//  Send a request to the server to update the user's email address
		try {
			// Send a POST request to the server to update the user's email address.
			const res = await axios.post('/api/v1/user/settings/updateEmail', {
				email,
				newEmail,
				password
			});


			if (res.data.message === 'Something went wrong.') {
				setErrorMessage(res.data.message);
			}
			// If the request is successful, remove the token from localStorage and set the loggedIn state to false.
			localStorage.removeItem('token');
			setLoggedIn(false);

			// Navigate to the login page
			navigate('/login');
		} catch (error) {
			// If the request is unsuccessful, set the error message to the error message returned from the server.
			setErrorMessage(error.message);
		}

	}

	// The JSX code representing the UpdateEmail component
	return (
		<section className='main-container'>
			<h1>Update Email</h1>
			<form method='post'>
				<input
					type="email"
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Enter your existing email'
				/>
				<input
					type="text"
					name='newEmail'
					value={newEmail}
					onChange={(e) => setNewEmail(e.target.value)}
					placeholder='Enter new email'
				/>
				<input
					type="password"
					name='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Enter Your Password'
				/>

				<hr />

				
				{
					errorMessage && <div className='fail'>{errorMessage}</div>
				}

				<button
					disabled={
						!newEmail || !password || !email
					}
					className='btn'
					onClick={updateEmail}>Update Email</button>
				{
					errorMessage && <div>{errorMessage}</div>
				}
			</form>
		</section>
	)
};

// Export the UpdateEmail component
export default UpdateEmail;