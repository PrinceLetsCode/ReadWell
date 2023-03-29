/** 
 * @description This component is used to update the user's password.
 * @param {Object} props - The props passed to the component by its parent.
 * @return {JSX.Element} The JSX code representing the UpdatePassword component.
 * @requires axios
 * @requires react
 * @requires react-router-dom
 * @requires ../../context/loggedInContext
 * */
  
// Import the required modules
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLoggedInContext } from '../../context/loggedInContext';


// The UpdatePassword component
const UpdatePassword = () => {

	// The state variables
	const [user, setUser] = useState({
		email: "",
		newPassword: "",
		confirmNewPassword: "",
		oldPassword: ""
	});

	// for error message.
	const [errorMessage, setErrorMessage] = useState('');

	// for navigation
	const navigate = useNavigate();

	// for context
	const { setLoggedIn } = useLoggedInContext();

	//  Handle change in input fields
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUser({ ...user, [name]: value });
	}

	// The function to update the user's password
	const updatePassword = async (e) => {
		e.preventDefault();
		try {

			// Send a POST request to the server to update the user's password.
			const res = await axios.post('/api/v1/user/settings/updatePassword', {
				email: user.email,
				newPassword: user.newPassword,
				password: user.oldPassword
			});

			if (res.data.message === 'Something went wrong.') {
				setErrorMessage(res.data.message);
			} else {
				// If the request is successful, remove the token from localStorage and set the loggedIn state to false.
				localStorage.removeItem('token');
				setLoggedIn(false);

				// Navigate to the login page
				navigate('/login');
			}
	
		} catch (error) {
			// If the request is unsuccessful, set the error message to the error message returned from the server.
			setErrorMessage( error.response.data.message);
		}

	}



	// Return the JSX code for the UpdatePassword component
	return (
		<section className='main-container'>
			<article className='content-container'>
			<h1 className='headings'>Update Password</h1>
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

					<hr />
					
				{errorMessage && <p className='fail'>{errorMessage}</p>}

				<button
					disabled={!user.email || !user.newPassword || !user.confirmNewPassword || !user.oldPassword || user.newPassword !== user.confirmNewPassword}
					className='btn'
					onClick={updatePassword}
				>Update Password
				</button>
		
				</form>
			</article>
		</section>
	)
};

// Export the UpdatePassword component
export default UpdatePassword;