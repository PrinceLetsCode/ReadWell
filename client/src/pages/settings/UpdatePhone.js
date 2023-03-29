/** 
 * @description This component is used to update the phone number of the user
 * @param {Object} props - The props passed to the component by its parent
 * @return {JSX.Element} The JSX code representing the UpdatePhone component
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

//  The UpdatePhone component
const UpdatePhone = () => {


	// The state variables
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [newPhone, setNewPhone] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	// for context
	const { setLoggedIn } = useLoggedInContext();

	// for navigation
	const navigate = useNavigate();

	// The function to update the user's phone number
	const updatePhone = async (e) => {
		e.preventDefault();
		try {
			// 	Send a POST request to the server to update the user's phone number
			await axios.post('/api/v1/user/settings/updatePhone', {
				email,
				phone,
				newPhone,
				password
			});			
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

	// The JSX code representing the UpdatePhone component
	return (
		<section className='main-container'>
			<h1 className='headings'>Update Phone</h1>
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

				<hr />

				{errorMessage && <p className='fail'>{errorMessage}</p>}

				<button
					disabled={
						!newPhone || !password || !email
					}
					className='btn'
					onClick={updatePhone}>
					Update Phone
				</button>
		
			</form>
		</section>
	)
};


// Export the UpdatePhone component
export default UpdatePhone;