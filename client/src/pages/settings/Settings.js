import React from 'react'
import { useNavigate } from 'react-router-dom';

const Settings = () => {

	const navigate = useNavigate();
	
	return (
		<section>
			<h1>Settings</h1>
			<article className='article settings-article'>
				<button onClick={() => navigate('/user/settings/updateUsername')} className='btn'>Update Username</button>
				<button onClick={() => navigate('/user/settings/updateEmail')} className='btn'>Update Email</button>
				<button onClick={() => navigate('/user/settings/updatePhone')} className='btn'>Update Phone</button>
				<button onClick={() => navigate('/user/settings/updatePassword')} className='btn'>Update Password</button>
			</article>
		</section>
	)
};

export default Settings;