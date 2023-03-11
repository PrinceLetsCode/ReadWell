import React from 'react'
import { useNavigate } from 'react-router-dom';

const Settings = () => {

	const navigate = useNavigate();
	
	return (
		<section className='main-container'>
			<h1 className='headings'>Settings</h1>
			<article className='content-container'>
				<button onClick={() => navigate('/user/settings/updateUsername')} className='btn'>Update Username</button>
				<button onClick={() => navigate('/user/settings/updateEmail')} className='btn'>Update Email</button>
				<button onClick={() => navigate('/user/settings/updatePhone')} className='btn'>Update Phone</button>
				<button onClick={() => navigate('/user/settings/updatePassword')} className='btn'>Update Password</button>
			</article>
		</section>
	)
};

export default Settings;