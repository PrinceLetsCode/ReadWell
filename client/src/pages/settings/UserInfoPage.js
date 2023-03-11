import React, { useEffect, useState } from 'react';
import useUser from '../../auth/useUser'; // Importing custom hook
import axios from 'axios'; // Importing axios for HTTP requests

const UserInfoPage = () => {
	// Initializing component state
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

	const { email } = useUser(); // Destructuring user email from custom hook
	console.log(email); // Logging user email

	// Function to fetch user data from server
	const getUser = async () => {
		try {
			const res = await axios.post('/api/v1/user/getUser', {
				email: email // Sending user email in request body
			});

			const data = res.data; // Storing received data from server
			// Updating state with the received data and setting isVerified value to 'Verified' or 'Not Verified'
			const isVerified = data.isVerified ? 'Verified' : 'Not Verified'
			setData({ ...data, isVerified });
			console.log(data); // Logging received data

		} catch (error) {
			console.log(error); // Logging error if there is any
		}
	}

	// Effect hook to fetch user data on component mount
	useEffect(() => {
		getUser();
	}, [])

	return (
		<section className='main-container'>
			{/* Rendering user information */}
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

export default UserInfoPage;
