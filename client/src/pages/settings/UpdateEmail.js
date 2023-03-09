import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLoggedInContext } from '../../context/loggedInContext';

const UpdateEmail = () => {
	const [email, setEmail] = useState('');
	const [newEmail, setNewEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	const { setLoggedIn } = useLoggedInContext();


	const updateEmail = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('/api/v1/user/settings/updateEmail', {
				email,
				newEmail,
				password
			});

			localStorage.removeItem('token');
			setLoggedIn(false);
			navigate('/login');
		} catch (error) {
			setErrorMessage(error.message);
		}

	}

	return (
		<section>
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
export default UpdateEmail;