import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLoggedInContext } from '../context/loggedInContext';

const HomeAfterLogin = () => {
	const [bookName, setBookName] = useState('');
	const [authorName, setAuthorName] = useState('');
	const [successMessage, setSuccessMessage] = useState(false);
	const { loggedIn } = useLoggedInContext();
	const navigate = useNavigate();


	const addBook = () => {
		if (loggedIn) {
			alert('add book not implemented yet');
		}
		else {
			navigate('/login');
		}
	}


	return (
		<section className='main-container'>
			<section className='content-container'>
			<h1 className='heading-main'>ReadWell</h1>
				<form className='add-book' method='post'>
				<input
					type="text"
					name='bookName'
					value={bookName}
					onChange={(e) => setBookName(e.target.value)}
					placeholder='Book Name'
				/>

					
				<input
					type="text"
					name='AuthorName'
					value={authorName}
					onChange={(e)=> setAuthorName(e.target.value)}
					placeholder='Author Name'
				/>

					<hr />
					
				{successMessage &&  <div className='add-success'>Book Added</div>}
				<button
					className='btn'
					onClick={addBook}
				>Add Book</button>
			</form>

			</section>

			<section className='btn-grid'>
					<button onClick={()=> navigate('/user/allbooks')} className='btn home-btn'>All</button>
					<button onClick={()=> navigate('/user/ongoingbooks')} className='btn home-btn'>Ongoings</button>
					<button onClick={()=> navigate('/user/favouritebooks')} className='btn home-btn'>Favourites</button>
					<button onClick={()=> navigate('/user/completedbooks')} className='btn home-btn'>Completeds</button>
			</section>
		</section>

		
	)
};

export default HomeAfterLogin;