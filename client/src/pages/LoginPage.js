/**
	This module exports the LoginPage component, which allows users to log in to the application.
	It uses the useToken and useLoggedInContext hooks to manage the user's authentication status.
	The component renders a form with email and password input fields, and buttons to log in,
	reset the password, and create a new account.
*/

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToken from '../auth/useToken';
import { useLoggedInContext } from '../context/loggedInContext';

/**
	The LoginPage component allows users to log in to the application.
	@return {JSX.Element} The JSX code representing the LoginPage component
*/

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

	/**
		The handleLogin function is called when the user submits the login form.
		It sends a POST request to the '/api/v1/login' endpoint with the user's email and password.
		If the request is successful, the user's token is saved, their authentication status is set to true,
		and they are redirected to the home page. If the request fails, an error message is displayed.
		@param {Event} e - The form submission event
	*/
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('/api/v1/login', {
				email,
				password
			})
			const { token } = res.data;
			setToken(token);
			setLoggedIn(true)
			navigate('/');
		} catch (error) {
			setErrorMessage(error.message)
		}
	}

	// Render the login form with input fields for email and password, and buttons for logging in, resetting the password, and creating a new account
	return (
		<section>
			<h1>Log In</h1>
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

export default LoginPage;