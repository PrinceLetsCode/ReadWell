import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToken from '../auth/useToken';
import axios from 'axios';
import { useLoggedInContext } from "../context/loggedInContext";



const SignUpPage = () => {
	const [token, setToken] = useToken();
	const [user, setUser] = useState({
		name: "",
		email: "",
		userName: "",
		password: "",
		confirmPassword: "",
		phone: "",
	});

	const navigate = useNavigate();
	const { setLoggedIn } = useLoggedInContext();
	const [errorMessage, setErrorMessage] = useState('');

	console.log('in the signup page');
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUser({ ...user, [name]: value });
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		console.log('inside handle submit');
		try {
			const res = await axios.post('/api/v1/signup', {
				name: user.name,
				email: user.email,
				userName: user.userName,
				password: user.password,
				phone: user.phone,
			})

			const { token } = res.data;
			setToken(token);
			setLoggedIn(true);
			navigate('/user/pleaseVerifyEmail');
			
		} catch (error) {
			setErrorMessage(error.message);
		}
	}


	return (
		<section className='main-container'>

			<h1 className="headings">Sign Up</h1>
			{errorMessage && <div className="fail">{errorMessage}</div>}
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

export default SignUpPage;