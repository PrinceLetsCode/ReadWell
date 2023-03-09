import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLoggedInContext } from '../../context/loggedInContext';

const UpdatePassword = () => {

	const [user, setUser] = useState({
		email: "",
		newPassword: "",
		confirmNewPassword: "",
		oldPassword: ""
	});

	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	const { setLoggedIn } = useLoggedInContext();

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUser({ ...user, [name]: value });
	}

	const updatePassword = async (e) => {
		e.preventDefault();
		try {

			const res = await axios.post('/api/v1/user/settings/updatePassword', {
				email: user.email,
				newPassword: user.newPassword,
				password: user.oldPassword
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
			<h1>Update Password</h1>
			<form method='post'>
				<input type="email"
					name='email'
					value={user.email}
					onChange={handleChange}
					placeholder='Enter Your email'
				/>
				<input
					type="password"
					name='newPassword'
					value={user.newPassword}
					onChange={handleChange}
					placeholder='Enter new password'
				/>
				<input
					type="password"
					name='confirmNewPassword'
					value={user.confirmNewPassword}
					onChange={handleChange}
					placeholder='Confirm new password'
				/>
				<input
					type="password"
					name='oldPassword'
					value={user.oldPassword}
					onChange={handleChange}
					placeholder='Enter your old password'
				/>

				<button
					disabled={!user.email || !user.newPassword || !user.confirmNewPassword || !user.oldPassword || user.newPassword !== user.confirmNewPassword}
					className='btn'
					onClick={updatePassword}
				>Update Password
				</button>
				{
					errorMessage && <div>{errorMessage}</div>
				}

			</form>
		</section>
	)
};

export default UpdatePassword;