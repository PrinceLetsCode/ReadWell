import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLoggedInContext } from '../../context/loggedInContext';

const UpdateUsername = () => {
	const [email, setEmail] = useState('');
	const [newUsername, setNewUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	const { setLoggedIn } = useLoggedInContext();


	const updateUsername = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('/api/v1/user/settings/updateUsername', {
				email,
				newUsername,
				password
			})

			localStorage.removeItem('token');
			setLoggedIn(false);
			navigate('/login');
		} catch (error) {
			setErrorMessage(error.message);
		}
	}

	return (
		<section>
			<h1>Update Username</h1>
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

				<button
					disabled={
						!newUsername || !password
					}
					className='btn' onClick={updateUsername}>Update Username</button>
				
				{
					errorMessage && <div>{errorMessage}</div>
				}

			</form>
		</section>
	)
};

export default UpdateUsername;