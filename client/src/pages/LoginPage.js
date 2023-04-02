
/**  
 * @description The LoginPage component allows users to log in to the application.
 * @return {JSX.Element} The JSX code representing the LoginPage component
 * @requires react (for JSX)
 * @requires react-router-dom (for navigation)
 * @requires axios (for making HTTP requests)
 * @requires ../auth/useToken (custom hook)
 * @requires ./context/loggedInContext (context)
 */


// import the required modules
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToken from '../auth/useToken';
import { useLoggedInContext } from '../context/loggedInContext';


// The LoginPage component
const LoginPage = () => {

	// Get setToken function from the useToken hook
	const [, setToken] = useToken();

	// Set up state for error messages, email, and password input fields
	const [errorMessage, setErrorMessage] = useState('');

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// Get the setLoggedIn function from the useLoggedInContext hook
	const { setLoggedIn } = useLoggedInContext();

	// Get the navigate function from the useNavigate hook
	const navigate = useNavigate();


	// Function to handle the login form submission
	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			// Send a POST request to the server to log in
			const res = await axios.post('/api/v1/login', {
				email,
				password
			})

			// If the login is successful then set the token in the local storage and navigate to the home page
			const { token } = res.data;

			//  Set the token in the local storage
			setToken(token);

			// Set the loggedIn state to true
			setLoggedIn(true)

			// Navigate to the home page
			navigate('/');
		} catch (error) {
			// If the login is unsuccessful then set the error message
			setErrorMessage(error.message)
		}
	}

	// Render the login form with input fields for email and password, and buttons for logging in, resetting the password, and creating a new account
	return (
		<section className='main-container'>
			<h1 className='headings'>Log In</h1>
			{errorMessage && <div>{errorMessage}</div>}
			<form method='post'>
				<input
					id='user'
					type="text"
					name='user'
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder='enter your email' />

				<input
					id='password'
					name='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					type="password"
					placeholder='Enter your password'
				/>
				<hr />
				<button
					className='btn'
					onClick={handleLogin}
					disabled={!email || !password}
				>Login</button>
				<button
					className='btn'
					onClick={() => { navigate('/login/forgotpassword') }}
				>Forgot Password ?</button>

				<button
					className='btn'
					onClick={() => { navigate('/signup') }}
				> Don't have an account ? Create One</button>

			</form>
		</section>

	);
};

// Export the LoginPage component
export default LoginPage;