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
				<h2>Name: {data.name} </h2>
				<h2>username: {data.userName} </h2>
				<h2>email: {data.email}</h2>
				<h2>phone: {data.phone}</h2>
				<h2>account: {data.isVerified} </h2>
				<h2>All Books: {data.allBooks.length} </h2>
				<h2>Ongoing Books: {data.ongoingBooks.length} </h2>
				<h2>Favourite Books: {data.favouriteBooks.length} </h2>
				<h2>Completed Books: {data.completedBooks.length} </h2>
			</article>
			
		</section>
	)
};

// Export the UserInfoPage component
export default UserInfoPage;
