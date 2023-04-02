/** 
 * @description This component is used to display user information
 * @param {Object} props - The props passed to the component by its parent
 * @return {JSX.Element} The JSX code representing the UserInfoPage component
 * @requires axios
 * @requires react
 * @requires ../../auth/useUser
 * @requires react-router-dom
 * */

// Import the required modules
import React, { useEffect, useState } from 'react';
import useUser from '../../auth/useUser';
import axios from 'axios';


// The UserInfoPage component
const UserInfoPage = () => {
	//  The state variables
	const [data, setData] = useState({
		name: '',
		userName: '',
		email: '',
		phone: '',
		isVerified: 'Not Verified',
		allBooks: [],
		ongoingBooks: [],
		favouriteBooks: [],
		completedBooks: []
	});


	// Getting user email from useUser hook
	const { email } = useUser();


	// Function to fetch user data from server
	const getUser = async () => {
		try {

			// Sending a POST request to the server to get user data
			const res = await axios.post('/api/v1/user/getUser', {
				email: email
			});

			// Storing received data from server
			const data = res.data;

			// Converting isVerified to string, so that it can be rendered 
			// if isVerified is true, then it will be 'Verified' else 'Not Verified'
			const isVerified = data.isVerified ? 'Verified' : 'Not Verified'

			// Setting the state variable data to the received data
			setData({ ...data, isVerified });
		} catch (error) {
			console.log(error);
		}
	}

	//  Calling getUser function on component mount
	useEffect(() => {
		getUser();
	}, [])


	//  Returning the JSX code
	return (
		<section className='main-container'>
			<article className='content-container'>
				<h1 className='headings'> User Information</h1>


				<div className='user-info'>
					<h3>name </h3><h3>{data.name}</h3>
				</div>
				<div className='user-info'>
					<h3>username </h3> <h3>{data.userName}</h3>
				</div>
				<div className='user-info'>
					<h3>email</h3> <h3>{data.email}</h3>
				</div>
				<div className='user-info'>
					<h3>phone </h3> <h3>{data.phone}</h3>
				</div>
				<div className='user-info'>
					<h3>account </h3><h3>{data.isVerified}</h3>
				</div>
				<div className='user-info'>
					<h3>All Books  </h3><h3>{data.allBooks.length} {data.allBooks.length > 1 ? 'books' : 'book'}</h3>
				</div>
				<div className='user-info'>
					<h3>Ongoing Books  </h3><h3> {data.ongoingBooks.length} {data.ongoingBooks.length > 1 ? 'books' : 'book'}</h3>
				</div>
				<div className='user-info'>
					<h3>Favourite Books </h3><h3>{data.favouriteBooks.length} {data.favouriteBooks.length > 1 ? 'books' : 'book'} </h3>
				</div>
				<div className='user-info'>
					<h3>Completed Books </h3> <h3>{data.completedBooks.length} {data.completedBooks.length > 1 ? 'books' : 'book'}</h3>
				</div>
			</article>

		</section>
	)
};

// Export the UserInfoPage component
export default UserInfoPage;
