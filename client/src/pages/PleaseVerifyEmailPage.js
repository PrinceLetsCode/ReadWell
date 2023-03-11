import React from 'react'
import { useNavigate } from 'react-router-dom';

const PleaseVerifyEmailPage = () => {
	const navigate = useNavigate();
	return (
		<div>
			<h1>Thanks for signing up!</h1>
			<p>
				A verification email has been sent to your provided email address, please verify your email to unlock full site features.
			</p>

			<button onClick={() => navigate('/')} className='btn'>Go to Home Page</button>
		</div>
	)
};

export default PleaseVerifyEmailPage;