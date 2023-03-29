/** 
 * @description This is the sign up page. It allows the user to sign up for an account.
 * @return {JSX.Element} The JSX code representing the SignUpPage page.
 * @requires react (for JSX)
 * @requires react-router-dom (for navigation)
 * @requires useToken (for setting the token)
 * @requires axios (for making API calls)
 * @requires useLoggedInContext (for setting the loggedIn state)
 */


// Import the required modules
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from '../auth/useToken';
import axios from 'axios';
import { useLoggedInContext } from "../context/loggedInContext";

// The SignUpPage component
const SignUpPage = () => {
	// get the setToken function from the useToken hook to set the token in the local storage
	const [, setToken] = useToken();

	//  Set up state for the user object
	const [user, setUser] = useState({
		name: "",
		email: "",
		userName: "",
		password: "",
		confirmPassword: "",
		phone: "",
	});

	// for navigation
	const navigate = useNavigate();

	// Get the setLoggedIn function from the useLoggedInContext hook to set the loggedIn state
	const { setLoggedIn } = useLoggedInContext();

	// Set up state for error and success messages
	const [errorMessage, setErrorMessage] = useState('');


	// Handle change in the input fields
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUser({ ...user, [name]: value });
	};

	// Handle the form submission
	const handleSignup = async (e) => {
		e.preventDefault();

		try {
			//  Send a POST request to the server to sign up
			const res = await axios.post('/api/v1/signup', {
				name: user.name,
				email: user.email,
				userName: user.userName,
				password: user.password,
				phone: user.phone,
			})

			// If the sign up is successful then set the token in the local storage and navigate to the home page) {
			const { token } = res.data;

			if (token) {
				setToken(token);
				setLoggedIn(true);
				navigate('/user/pleaseVerifyEmail');
			}
			else {
				setErrorMessage('Something went wrong');
			}

			setInterval(() => {	
				setErrorMessage('');
			}, 3000);
			
		} catch (error) {
			setErrorMessage(error.response.data.message);
		}
	}


	// Return the JSX code for the SignUpPage component
	return (
		<section className='main-container'>

			<h1 className="headings">Sign Up</h1>
			<form method="POST">

				<input
					name="name"
					id="name"
					value={user.name}
					onChange={handleChange}
					type="text"
					placeholder="Enter your name" />

				<input
					name="email"
					id="email"
					value={user.email}
					onChange={handleChange}
					type="email"
					placeholder="Enter your email" />

				<input
					name="userName"
					id="userName"
					value={user.userName}
					onChange={handleChange}
					type="text"
					placeholder="Enter your user name" />


				<input
					name="phone"
					id="phone"
					value={user.phone}
					onChange={handleChange}
					type="text"
					placeholder="Enter your phone" />

				<input
					name="password"
					id="password"
					value={user.password}
					onChange={handleChange}
					type="password"
					placeholder="Enter your password" />

				<input
					name="confirmPassword"
					id="cpassword"
					value={user.confirmPassword}
					onChange={handleChange}
					type="password"
					placeholder="Confirm your password"
				/>


				<hr />

				
				{errorMessage && <div className="fail">{errorMessage}</div>}


				<button
					className="btn"
					onClick={handleSignup}
					disabled={
						!user.email || !user.name || !user.password
						|| !user.confirmPassword || !user.phone || !user.userName || user.password !== user.confirmPassword
					}
				>Sign Up</button>
				<button
					className="btn"
					onClick={() => { navigate('/login') }}
				>Already have an account? Log In</button>
			</form>
		</section>
	)
};

// Export the SignUpPage component
export default SignUpPage;