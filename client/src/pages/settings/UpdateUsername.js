/**
 * @description This component is used to update the username of the user
 * @param {Object} props - The props passed to the component by its parent
 * @return {JSX.Element} The JSX code representing the UpdateUsername component
 * @requires axios
 * @requires react
 * @requires react-router-dom
 * @requires ../../context/loggedInContext
 */

// Import the required modules
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLoggedInContext } from '../../context/loggedInContext';


//  The UpdateUsername component
const UpdateUsername = () => {

	// The state variables for the form fields.
	const [email, setEmail] = useState('');
	const [newUsername, setNewUsername] = useState('');
	const [password, setPassword] = useState('');

	// The state variable for the error message
	const [errorMessage, setErrorMessage] = useState('');

	// for navigation
	const navigate = useNavigate();

	// for context
	const { setLoggedIn } = useLoggedInContext();


	// The function to update the user's username
	const updateUsername = async (e) => {
		e.preventDefault();
		try {

			// 	Send a POST request to the server to update the user's username
			await axios.post('/api/v1/user/settings/updateUsername', {
				email,
				newUsername,
				password
			})

			// If the request is successful, remove the token from localStorage and set the loggedIn state to false.
			localStorage.removeItem('token');
			setLoggedIn(false);

			// Navigate to the login page
			navigate('/login');
		} catch (error) {
			// If the request is unsuccessful, set the error message to the error message returned from the server.
			setErrorMessage(error.response.data.message);
		}
	}

	// The JSX code representing the UpdateUsername component
	return (
		<section className='main-container'>
			<h1 className='headings'>Update Username</h1>
			<form method='post'>
				<input
					type='email'
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Enter your email'
				/>

				<input
					type="text"
					name='newUsername'
					value={newUsername}
					onChange={(e) => setNewUsername(e.target.value)}
					placeholder='Enter new username'
				/>

				<input
					type="password"
					name='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Enter Your password'
				/>

				<hr />

				{/* If there is an error message, display it */}
				{errorMessage && <p className='fail'>{errorMessage}</p>}

				<button
					disabled={
						!newUsername || !password
					}
					className='btn' onClick={updateUsername}>Update Username</button>
				


			</form>
		</section>
	)
};


// Export the UpdateUsername component
export default UpdateUsername;