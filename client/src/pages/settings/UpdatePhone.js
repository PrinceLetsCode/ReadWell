import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLoggedInContext } from '../../context/loggedInContext';

const UpdatePhone = () => {
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [newPhone, setNewPhone] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const { setLoggedIn } = useLoggedInContext();
	const navigate = useNavigate();


	const updatePhone = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('/api/v1/user/settings/updatePhone', {
				email,
				phone,
				newPhone,
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
			<h1>Update Phone</h1>
			<form method='post'>

				<input
					type="email"
					name='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder='Enter your email'
				/>

				<input
					type="text"
					name='Phone'
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					placeholder='Enter existing phone number'
				/>

				<input
					type="text"
					name='newPhone'
					value={newPhone}
					onChange={(e) => setNewPhone(e.target.value)}
					placeholder='Enter new phone number'
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
						!newPhone || !password || !email
					}
					className='btn'
					onClick={updatePhone}>
					Update Phone
				</button>
				{
					errorMessage && <div>{errorMessage}</div>
				}
			</form>
		</section>
	)
};

export default UpdatePhone;